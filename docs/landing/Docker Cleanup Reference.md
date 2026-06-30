# Disk Space Cleanup Investigation Summary

## Objective

Find what was consuming disk space and determine whether old Hyper-V VMs were still using storage.

---

## Investigation Performed

### 1. Checked WSL distributions

```powershell
wsl --list --verbose
```

Result:

```text
Ubuntu
docker-desktop
```

Observations:

* Ubuntu WSL2 is active.
* Docker Desktop uses WSL2.
* No large hidden WSL distributions found.

---

### 2. Checked VHDX files

```powershell
Get-ChildItem C:\,D:\,E:\ -Recurse -Include *.vhdx
```

Found:

| File                    |     Size |
| ----------------------- | -------: |
| Ubuntu ext4.vhdx        |  ~5.5 GB |
| Docker docker_data.vhdx | ~25.9 GB |
| My-Ubuntu-1.vhdx        |     4 MB |
| My-Ubuntu-2.vhdx        |     4 MB |

Conclusion:

* Hyper-V test VMs are tiny.
* Docker storage is the major consumer.

---

### 3. Checked Hyper-V

```powershell
Get-VM
```

Found:

```text
vm-ub1
```

Observations:

* Only one leftover Hyper-V VM remained.
* Hyper-V VM disks were not consuming meaningful space.

---

### 4. Disabled Hyper-V

Verified:

```powershell
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```

Hyper-V was disabled.

Conclusion:

* Hyper-V was not responsible for current disk usage.

---

### 5. Used WizTree

Major consumers identified:

| Item             |    Size |
| ---------------- | ------: |
| docker_data.vhdx | 25.9 GB |
| WATCHDOG dump    |  5.9 GB |
| Ubuntu ext4.vhdx |  5.5 GB |
| pagefile.sys     |  3.9 GB |

Conclusion:

* Docker data is the largest storage consumer.
* Old Hyper-V VMs are insignificant.

---

### 6. Checked Docker

```powershell
docker ps -a
docker images
```

Found:

Images:

```text
ecommerce-platform-backend
postgres:17
redis:8
```

Total visible image usage:

~1.4 GB

Observation:

* Docker VHDX = 25.9 GB
* Visible images = ~1.4 GB

Meaning:

* Old layers/build cache/deleted content likely remain inside Docker storage.

---

### 7. Verified Docker VHDX

```powershell
dir C:\Users\HP\AppData\Local\Docker\wsl\disk
```

Result:

```text
docker_data.vhdx
27,815,575,552 bytes
≈ 25.9 GB
```

Confirmed Docker is the primary storage consumer.

---

# Current Storage Situation

| Component           | Approx Size |
| ------------------- | ----------: |
| Docker Desktop data |     25.9 GB |
| Ubuntu WSL          |      5.5 GB |
| WATCHDOG crash dump |      5.9 GB |
| Hyper-V test VMs    |       ~8 MB |

---

# Recommended Cleanup (Now)

### Safe cleanup

Delete old crash dump:

```powershell
del C:\Windows\LiveKernelReports\WATCHDOG*.dmp
```

Expected recovery:

```text
~6 GB
```

---

# Docker Cleanup Reference (After Development Completes)

Use this checklist whenever a project is finished.

---

## Step 1 – Remove stopped containers

```powershell
docker container prune
```

---

## Step 2 – Remove unused images

```powershell
docker image prune -a
```

Removes images not used by any container.

---

## Step 3 – Remove build cache

```powershell
docker builder prune -a
```

Often frees several GB.

---

## Step 4 – Remove unused networks

```powershell
docker network prune
```

---

## Step 5 – Remove unused volumes (Be Careful)

```powershell
docker volume prune
```

Only run if database data is no longer needed.

Can permanently delete:

* PostgreSQL data
* Redis persistence
* Uploaded files

---

## Step 6 – Full Cleanup

After project completion:

```powershell
docker system prune -a
```

Removes:

* Stopped containers
* Unused images
* Unused networks
* Build cache

---

## Step 7 – Maximum Cleanup

Only when project is completely finished:

```powershell
docker system prune -a --volumes
```

Removes everything unused including volumes.

---

# Check Docker Usage Anytime

```powershell
docker ps -a
docker images
docker volume ls
docker system df
```

Useful before and after cleanup.

---

# Final Architecture Recommendation

Keep:

✅ WSL2 Ubuntu
✅ Docker Desktop
✅ PostgreSQL container
✅ Redis container

Remove:

❌ Old Hyper-V lab VMs (when no longer needed)
❌ Old VHDX test files
❌ Old crash dumps

This gives you a clean developer setup:

```text
Windows 11
   ↓
WSL2 Ubuntu
   ↓
Docker Desktop
   ↓
PostgreSQL / Redis / Backend Containers
```

without needing Hyper-V virtual machines for day-to-day development.
