# Reconnecting to Your VPS

## Quick Reconnect

**Just run:**
```bash
ssh root@74.208.155.182
```

Enter your password when prompted.

## If Connection Keeps Dropping

### Option 1: Use Screen (Recommended)

**Screen keeps your session alive even if you disconnect:**

```bash
# Connect to server
ssh root@74.208.155.182

# Install screen (if not already installed)
apt install -y screen

# Start a screen session
screen -S setup

# Now run your commands - if you disconnect, your work continues!
# To reconnect later:
ssh root@74.208.155.182
screen -r setup
```

**Screen shortcuts:**
- `Ctrl+A` then `D` = Detach (disconnect but keep running)
- `screen -r setup` = Reattach to session
- `screen -ls` = List all sessions

### Option 2: Use TMUX

```bash
# Install tmux
apt install -y tmux

# Start tmux session
tmux new -s setup

# If disconnected, reconnect with:
tmux attach -t setup
```

### Option 3: Prevent SSH Timeout

**On your Mac, edit SSH config:**
```bash
nano ~/.ssh/config
```

**Add:**
```
Host 74.208.155.182
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

This sends a keepalive signal every 60 seconds.

## Troubleshooting

### "Connection refused"
- Server might be restarting
- Wait 30 seconds and try again
- Check if server is up in Ionos dashboard

### "Permission denied"
- Make sure you're using the correct password
- Check if password was reset in Ionos dashboard

### "Host key verification failed"
```bash
ssh-keygen -R 74.208.155.182
ssh root@74.208.155.182
```

### Can't connect at all
1. Check Ionos dashboard - is server running?
2. Check your internet connection
3. Try from a different network (mobile hotspot)

## Quick Commands

```bash
# Reconnect
ssh root@74.208.155.182

# If using screen
screen -r setup

# If using tmux
tmux attach -t setup

# Check if you have any screen sessions
screen -ls

# Check if you have any tmux sessions
tmux ls
```

## Continue Where You Left Off

**If you were in the middle of database setup:**

1. **Reconnect:**
   ```bash
   ssh root@74.208.155.182
   ```

2. **Check if PostgreSQL is running:**
   ```bash
   sudo systemctl status postgresql
   ```

3. **Continue with database setup:**
   ```bash
   sudo -u postgres psql
   ```

**If you were running the setup script:**
- The script might have completed or failed
- Check what's installed: `which postgresql` or `systemctl status postgresql`
- You can re-run the script - it's safe (won't duplicate things)

## Best Practice: Use Screen for Long Tasks

**For the database setup, use screen:**
```bash
# Connect
ssh root@74.208.155.182

# Start screen
screen -S db-setup

# Now run your commands
sudo -u postgres psql
# ... do your database setup ...

# If you disconnect, just reconnect and run:
screen -r db-setup
```

This way, even if you disconnect, your PostgreSQL session stays active!

