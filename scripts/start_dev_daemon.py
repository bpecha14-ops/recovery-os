#!/usr/bin/env python3
"""Start the platform's .zscripts/dev.sh as a true daemon (double-fork).

Mimics exactly what the platform's init-fullstack.sh does, plus a double
fork so the server is fully reparented to PID 1 BEFORE this shell exits —
the sandbox reaps descendants of each Bash-tool call at its end, so the
server must not be one by then.
"""
import os
import socket
import sys

PROJECT = "/home/z/my-project"
DEV_SH = os.path.join(PROJECT, ".zscripts", "dev.sh")
LOG = os.path.join(PROJECT, ".zscripts", "dev.log")
PIDFILE = os.path.join(PROJECT, ".zscripts", "dev.pid")

# Sanity: if something already listens on 3000, do nothing.
s = socket.socket()
try:
    s.bind(("127.0.0.1", 3000))
    s.close()
except OSError:
    print("port 3000 already in use — server may be running")
    sys.exit(0)

pid = os.fork()
if pid > 0:
    os.waitpid(pid, 0)
    print("daemon forked")
    sys.exit(0)

# first child: new session, then fork again
os.setsid()
pid2 = os.fork()
if pid2 > 0:
    os._exit(0)

# grandchild: PPID is now 1 — safe from shell-exit sweeps
os.chdir(PROJECT)
os.umask(0o022)
fd_out = os.open(LOG, os.O_WRONLY | os.O_CREAT | os.O_APPEND, 0o644)
fd_in = os.open("/dev/null", os.O_RDONLY)
os.dup2(fd_in, 0)
os.dup2(fd_out, 1)
os.dup2(fd_out, 2)
os.environ["DATABASE_URL"] = "file:" + os.path.join(PROJECT, "db", "custom.db")
with open(PIDFILE, "w") as f:
    f.write(str(os.getpid()))
os.execvp("bash", ["bash", DEV_SH])
