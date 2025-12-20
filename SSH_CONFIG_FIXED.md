# Fixed SSH Config

## Correct SSH Config

**Edit your SSH config:**
```bash
nano ~/.ssh/config
```

**Use this (corrected version):**
```
Host vps
    HostName 74.208.155.182
    User root
    ServerAliveInterval 60
    ServerAliveCountMax 3
    ConnectTimeout 10
    TCPKeepAlive yes
    Compression yes
    GSSAPIAuthentication no
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

**Note:** Removed `UseDNS` - that's a server-side option, not client-side.

## Test It

```bash
ssh vps
```

**Should connect faster now!**

## If You Still Get Errors

**Check your config syntax:**
```bash
ssh -F ~/.ssh/config -T vps
```

**Or just use the minimal version:**
```
Host vps
    HostName 74.208.155.182
    User root
    ServerAliveInterval 60
    ConnectTimeout 10
```

**This should work without errors.**


