import React, { useState } from 'react';
import {
  Terminal,
  Download,
  Copy,
  Check,
  Server,
  Layers,
  ExternalLink,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';

export const SetupPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  // Connection Builder state
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("5432");
  const [user, setUser] = useState("postgres");
  const [password, setPassword] = useState("postgres123");
  const [database, setDatabase] = useState("libraryDB");

  const psqlCmd = `psql -h ${host} -p ${port} -U ${user} -d ${database}`;
  const uriString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const dockerScriptContent = `#!/usr/bin/env bash
# ==============================================================================
# Setup Docker Engine + PostgreSQL 16 Alpine for CSE 2206 DBMS Sessional
# ==============================================================================
set -e

CONTAINER_NAME="pg16_alpine"
PG_PORT="5432"
PG_USER="postgres"
PG_PASSWORD="postgres123"

echo "[1/4] Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing docker.io..."
    sudo apt-get update && sudo apt-get install -y docker.io docker-compose
    sudo systemctl enable --now docker
fi

echo "[2/4] Pulling postgres:16-alpine image..."
docker pull postgres:16-alpine

echo "[3/4] Starting PostgreSQL container..."
if [ "$(docker ps -aq -f name=\${CONTAINER_NAME})" ]; then
    echo "Stopping existing container..."
    docker rm -f \${CONTAINER_NAME}
fi

docker run -d \\
  --name \${CONTAINER_NAME} \\
  -e POSTGRES_USER=\${PG_USER} \\
  -e POSTGRES_PASSWORD=\${PG_PASSWORD} \\
  -p \${PG_PORT}:5432 \\
  -v pgdata_cse2206:/var/lib/postgresql/data \\
  --restart unless-stopped \\
  postgres:16-alpine

echo "[4/4] PostgreSQL 16 container ready!"
echo "Connect with: psql -h localhost -p 5432 -U postgres"
`;

  const handleDownloadScript = () => {
    const blob = new Blob([dockerScriptContent], { type: 'application/x-sh' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "setup_docker_postgres.sh";
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Lab Environment</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text mt-1">
          PostgreSQL &amp; DBeaver Setup Guide
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
          Reproduce the exact university lab environment on your personal laptop (Linux, Windows, macOS) using Docker or native packages.
        </p>
      </div>

      {/* 5 Connection Values Live Builder */}
      <div className="custom-card p-6">
        <h3 className="text-base font-bold text-text mb-2 flex items-center gap-2">
          <Server className="w-5 h-5 text-primary" /> The 5 Connection Values Builder (Week 1 Slide 4)
        </h3>
        <p className="text-xs text-text-muted mb-4">
          Every client tool (psql, DBeaver, Node, Python, Java) connects using these five primary parameters.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          <div>
            <label className="text-[11px] font-bold text-text-muted uppercase">Host</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-mono text-text focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-muted uppercase">Port</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-mono text-text focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-muted uppercase">User</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-mono text-text focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-muted uppercase">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-mono text-text focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-muted uppercase">Database</label>
            <input
              type="text"
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-mono text-text focus:outline-none"
            />
          </div>
        </div>

        {/* Generated commands */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between p-3 rounded-xl bg-code-bg font-mono text-xs text-code-text border border-border">
            <span className="truncate pr-2">{psqlCmd}</span>
            <button
              onClick={() => handleCopy(psqlCmd, 'psql')}
              className="p-1 rounded text-text-muted hover:text-text transition shrink-0"
              title="Copy psql CLI command"
            >
              {copied === 'psql' ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-code-bg font-mono text-xs text-code-text border border-border">
            <span className="truncate pr-2">{uriString}</span>
            <button
              onClick={() => handleCopy(uriString, 'uri')}
              className="p-1 rounded text-text-muted hover:text-text transition shrink-0"
              title="Copy connection URI"
            >
              {copied === 'uri' ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Option A: Docker Script */}
      <div className="custom-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-success/10 text-success">
              Option A · Recommended for Linux &amp; Mac
            </span>
            <h3 className="text-lg font-bold text-text mt-1">Docker Setup Script</h3>
          </div>

          <button
            onClick={handleDownloadScript}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download setup_docker_postgres.sh
          </button>
        </div>

        <p className="text-xs text-text-muted leading-relaxed mb-4">
          Runs an idempotent script that starts <code className="font-mono text-primary font-bold">postgres:16-alpine</code> in a background container mapped to port 5432.
        </p>

        <div className="p-3 rounded-xl bg-surface-2 font-mono text-xs text-text border border-border space-y-1">
          <div className="text-text-muted"># 1. Grant execution permission:</div>
          <div className="font-bold">chmod +x setup_docker_postgres.sh</div>
          <div className="text-text-muted pt-2"># 2. Run script with sudo:</div>
          <div className="font-bold">sudo ./setup_docker_postgres.sh</div>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Note: The default password is for local training containers only. If you expose port 5432 beyond localhost, update PG_PASSWORD.</span>
        </div>
      </div>

      {/* Option B: DBeaver & Troubleshooting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="custom-card p-5">
          <h4 className="font-bold text-base text-text mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" /> DBeaver Lab Habits
          </h4>
          <ul className="text-xs text-text-muted space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Ctrl + Enter:</strong> Execute the single SQL statement under cursor.</li>
            <li><strong>Alt + X:</strong> Execute the entire SQL script sequentially.</li>
            <li><strong>Ctrl + ]:</strong> Open a new SQL console tab.</li>
            <li><strong>SET search_path TO txn_lab;</strong> Run this in new tabs during Week 7 transactions lab.</li>
          </ul>
        </div>

        <div className="custom-card p-5">
          <h4 className="font-bold text-base text-text mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-danger" /> Common Setup Errors &amp; Fixes
          </h4>
          <ul className="text-xs text-text-muted space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Connection refused:</strong> Check if Docker or local Postgres service is running on port 5432.</li>
            <li><strong>Password authentication failed:</strong> Verify password spelling (default in script is <code className="font-mono">postgres123</code>).</li>
            <li><strong>Relation does not exist:</strong> Unquoted identifiers are lowercase in PostgreSQL. Check schema or set <code className="font-mono">search_path</code>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
