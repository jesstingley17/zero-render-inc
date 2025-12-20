# Database Connection Troubleshooting

## Quick Diagnosis

**Run these commands on your VPS to check what's wrong:**

### 1. Check if PostgreSQL is running

```bash
sudo systemctl status postgresql
```

**Should show:** `active (running)`

**If not running:**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Check if database exists

```bash
sudo -u postgres psql -l
```

**Should show:** `zerorender` in the list

**If not there, create it:**
```bash
sudo -u postgres psql
CREATE DATABASE zerorender;
\q
```

### 3. Check if user exists

```bash
sudo -u postgres psql -c "\du"
```

**Should show:** `zerorender_user` in the list

**If not there, create it:**
```bash
sudo -u postgres psql
CREATE USER zerorender_user WITH PASSWORD 'YourPassword123!';
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
ALTER DATABASE zerorender OWNER TO zerorender_user;
\q
```

### 4. Test local connection

```bash
psql -h localhost -U zerorender_user -d zerorender
```

**Enter your password when prompted.**

**If this fails:**
- Check password is correct
- Check user exists: `sudo -u postgres psql -c "\du"`
- Check database exists: `sudo -u postgres psql -l`

### 5. Check PostgreSQL config

```bash
sudo cat /etc/postgresql/*/main/postgresql.conf | grep listen_addresses
```

**Should show:** `listen_addresses = '*'`

**If it shows:** `#listen_addresses = 'localhost'` or `listen_addresses = 'localhost'`:

```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
# Find and change to: listen_addresses = '*'
# Save: Ctrl+X, Y, Enter
sudo systemctl restart postgresql
```

### 6. Check access control

```bash
sudo tail -5 /etc/postgresql/*/main/pg_hba.conf
```

**Should show:** `host    zerorender    zerorender_user    0.0.0.0/0    md5`

**If not there:**
```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add at the end: host    zerorender    zerorender_user    0.0.0.0/0    md5
# Save: Ctrl+X, Y, Enter
sudo systemctl restart postgresql
```

### 7. Check firewall

```bash
sudo ufw status
```

**Should show:** `5432/tcp` in the list

**If not:**
```bash
sudo ufw allow 5432/tcp
sudo ufw reload
```

### 8. Check if PostgreSQL is listening

```bash
sudo netstat -tlnp | grep 5432
```

**Should show:** PostgreSQL listening on `0.0.0.0:5432` or `:::5432`

**If it only shows:** `127.0.0.1:5432` - PostgreSQL isn't configured for remote access

### 9. Test from outside (from your Mac)

**First, install psql on Mac (if not installed):**
```bash
brew install postgresql
```

**Then test:**
```bash
psql "postgresql://zerorender_user:YOUR_PASSWORD@74.208.155.182:5432/zerorender"
```

**If this fails, check:**
- Firewall on VPS
- PostgreSQL config (listen_addresses)
- pg_hba.conf entry

## Common Error Messages

### "password authentication failed"
- **Cause:** Wrong password or user doesn't exist
- **Fix:** 
  ```bash
  sudo -u postgres psql
  ALTER USER zerorender_user WITH PASSWORD 'NewPassword123!';
  \q
  ```

### "connection refused"
- **Cause:** PostgreSQL not running or not listening on the right interface
- **Fix:**
  ```bash
  sudo systemctl start postgresql
  sudo systemctl status postgresql
  # Check listen_addresses = '*' in postgresql.conf
  ```

### "database does not exist"
- **Cause:** Database wasn't created
- **Fix:**
  ```bash
  sudo -u postgres psql
  CREATE DATABASE zerorender;
  \q
  ```

### "role does not exist"
- **Cause:** User wasn't created
- **Fix:**
  ```bash
  sudo -u postgres psql
  CREATE USER zerorender_user WITH PASSWORD 'YourPassword123!';
  GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
  \q
  ```

### "permission denied"
- **Cause:** User doesn't have permissions
- **Fix:**
  ```bash
  sudo -u postgres psql
  GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
  ALTER DATABASE zerorender OWNER TO zerorender_user;
  \q
  ```

## Complete Reset (If Nothing Works)

**If you want to start fresh:**

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Drop and recreate everything
DROP DATABASE IF EXISTS zerorender;
DROP USER IF EXISTS zerorender_user;
CREATE DATABASE zerorender;
CREATE USER zerorender_user WITH PASSWORD 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE zerorender TO zerorender_user;
ALTER DATABASE zerorender OWNER TO zerorender_user;
\q

# Fix config
sudo nano /etc/postgresql/*/main/postgresql.conf
# Set: listen_addresses = '*'
# Save: Ctrl+X, Y, Enter

sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add at end: host    zerorender    zerorender_user    0.0.0.0/0    md5
# Save: Ctrl+X, Y, Enter

# Restart
sudo systemctl restart postgresql

# Allow firewall
sudo ufw allow 5432/tcp
```

## What Error Are You Seeing?

**Please share:**
1. What command you ran
2. The exact error message
3. What step you're on

This will help me give you a specific fix!


