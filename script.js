(() => { 
// ========================================================================= 
// TREND AGENCY - BM USER INVITER v2.0
// Facebook Business Manager User Inviter Tool
// Developed by Mr.OK
// ========================================================================= 

// Xóa giao diện cũ nếu tồn tại 
const oldContainer = document.getElementById('tool-container-invite') || document.querySelector('.ta-container-invite'); 
if (oldContainer) oldContainer.remove(); 

// Định nghĩa CSS 
const uiCss = ` 
.ta-container-invite { position: fixed; top: 50px; left: 50%; transform: translateX(-50%); width: 650px; background: white; border-radius: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.25); z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh; } 
.ta-header { background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); padding: 10px 15px; color: white; display: flex; justify-content: space-between; align-items: center; cursor: move; border-bottom: 3px solid #ffd700; } 
.ta-header h2 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); } 
.ta-header .ta-brand { color: #ffd700; } 
.ta-close-btn { background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; text-shadow: none; } 
.ta-close-btn:hover { background: rgba(255,255,255,0.2); } 
.ta-body { padding: 20px; overflow-y: auto; flex: 1; background-color: #f8f9fa; } 
.ta-form-group { margin-bottom: 15px; } 
.ta-form-group label { display: block; font-weight: 600; margin-bottom: 8px; color: #2c3e50; font-size: 14px; } 
.ta-input, .ta-textarea { width: 100%; padding: 10px 12px; border: 2px solid #e0e0e0; border-radius: 6px; box-sizing: border-box; transition: border-color 0.3s; font-size: 14px; font-family: 'SF Mono', Monaco, monospace; } 
.ta-input:focus, .ta-textarea:focus { border-color: #302b63; outline: none; box-shadow: 0 0 0 3px rgba(48, 43, 99, 0.15); } 
.ta-textarea { height: 120px; resize: vertical; } 
.ta-row { display: flex; gap: 15px; margin-bottom: 15px; flex-wrap: wrap; } 
.ta-col { flex: 1; min-width: 120px; } 
#action-radios { display: flex; flex-wrap: wrap; justify-content: space-around; background-color: #f0f0f0; padding: 12px; border-radius: 8px; margin: 15px 0; gap: 10px; } 
#action-radios label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 500; color: #555; } 
#control-buttons { display: flex; gap: 10px; } 
.ta-button { width: 100%; background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%); color: white; border: none; border-radius: 8px; padding: 12px 20px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 16px; z-index: 10; } 
.ta-button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(48, 43, 99, 0.35); } 
.ta-button:disabled { background: #bdc3c7; cursor: not-allowed; transform: none; box-shadow: none; opacity: 0.6; } 
.ta-button-danger { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); } 
.ta-button-danger:hover:not(:disabled) { box-shadow: 0 8px 20px rgba(231, 76, 60, 0.35); } 
.ta-button-secondary { background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); width: auto; padding: 8px 15px; font-size: 14px; } 
.ta-button-secondary:hover:not(:disabled) { box-shadow: 0 6px 15px rgba(40, 167, 69, 0.3); } 
.ta-button-gold { background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%); color: #2c3e50; } 
.ta-button-gold:hover:not(:disabled) { box-shadow: 0 8px 20px rgba(247, 151, 30, 0.35); } 
.ta-logs { background: #1a1a2e; border: 2px solid #2d2d44; border-radius: 8px; padding: 15px; height: 350px; overflow-y: auto; font-family: 'SF Mono', Monaco, monospace; font-size: 13px; line-height: 1.6; margin-top: 15px; color: #e0e0e0; } 
.ta-log-entry { padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.05); word-break: break-all; } 
.ta-log-success { color: #2ecc71; } .ta-log-error { color: #e74c3c; font-weight: 500; } 
.ta-log-info { color: #3498db; } .ta-log-warning { color: #f39c12; } .ta-log-gold { color: #ffd700; } 
.ta-footer { border-top: 1px solid #e0e0e0; padding: 12px 20px; text-align: center; font-size: 12px; color: #7f8c8d; background: #ffffff; } 
.ta-footer .ta-footer-brand { color: #302b63; font-weight: 600; } 
.ta-help-text { font-size: 12px; color: #7f8c8d; margin-top: 4px; } 
`; 

const uiHtml = ` 
<div class="ta-header"> 
    <h2>👥 <span class="ta-brand">TREND</span> AGENCY - BM USER INVITER</h2> 
    <button class="ta-close-btn">×</button> 
</div> 
<div class="ta-body"> 
    <div class="ta-form-group"> 
        <label for="bmIdInput">Business Manager ID:</label> 
        <input type="text" id="bmIdInput" class="ta-input" placeholder="Enter BM ID or click 'Get Current BM'"> 
        <button id="getCurrentBmBtn" class="ta-button ta-button-gold" style="margin-top: 8px; padding: 8px 15px; font-size: 14px; width: auto;">📋 Get Current BM</button> 
    </div> 
    <div class="ta-form-group"> 
        <label for="userListInput">User List (ID or Email):</label> 
        <textarea id="userListInput" class="ta-textarea" placeholder="Enter User IDs or Emails, one per line&#10;Example:&#10;1000123456789&#10;user@email.com"></textarea> 
        <div class="ta-help-text">💡 Supports both Facebook User ID and Email</div> 
    </div> 
    <div class="ta-row"> 
        <div class="ta-col"> 
            <label for="roleSelect">Role:</label> 
            <select id="roleSelect" class="ta-input"> 
                <option value="employee">Employee</option> 
                <option value="admin">Admin</option> 
            </select> 
        </div> 
        <div class="ta-col"> 
            <label for="threadsInput">Threads:</label> 
            <input type="number" id="threadsInput" class="ta-input" value="2" min="1" max="10"> 
        </div> 
        <div class="ta-col"> 
            <label for="delayMinInput">Delay Min (s):</label> 
            <input type="number" id="delayMinInput" class="ta-input" value="2" min="0" step="0.5"> 
        </div> 
        <div class="ta-col"> 
            <label for="delayMaxInput">Delay Max (s):</label> 
            <input type="number" id="delayMaxInput" class="ta-input" value="5" min="0" step="0.5"> 
        </div> 
    </div> 
    <div id="action-radios"> 
        <label><input type="radio" name="action" value="invite" checked> Invite Users</label> 
        <label><input type="radio" name="action" value="check"> Check Users</label> 
        <label><input type="radio" name="action" value="list"> List Invited</label> 
    </div> 
    <div id="control-buttons"> 
        <button id="startButton" class="ta-button">🚀 Start</button> 
        <button id="stopButton" class="ta-button ta-button-danger" disabled>🛑 Stop</button> 
    </div> 
    <div class="ta-form-group"> 
        <label for="logArea" style="margin-top: 15px;">Progress Log</label> 
        <div id="logArea" class="ta-logs">⭐ TREND AGENCY - BM User Inviter v2.0 ⭐<br>Welcome to TREND AGENCY Tool!</div> 
        <div id="copySection" style="display: none; margin-top: 10px; display: flex; gap: 10px; flex-wrap: wrap;"> 
            <button id="copySuccessBtn" class="ta-button ta-button-secondary" style="width: auto; padding: 6px 12px; font-size: 13px;">✅ Copy Success</button> 
            <button id="copyFailBtn" class="ta-button ta-button-secondary" style="width: auto; padding: 6px 12px; font-size: 13px;">❌ Copy Failed</button> 
            <button id="clearLogsBtn" class="ta-button ta-button-secondary" style="width: auto; padding: 6px 12px; font-size: 13px;">🗑️ Clear Logs</button> 
        </div> 
    </div> 
</div> 
<div class="ta-footer"> 
    © ${new Date().getFullYear()} <span class="ta-footer-brand">TREND AGENCY</span> - Developed by Mr.OK 
</div> 
`; 

const styleEl = document.createElement("style"); styleEl.textContent = uiCss; document.head.appendChild(styleEl); 
const container = document.createElement("div"); container.className = "ta-container-invite"; container.innerHTML = uiHtml; document.body.appendChild(container); 

// ========================================================================= 
// LOGIC ĐIỀU KHIỂN 
// ========================================================================= 
let isRunning = false, stopRequested = false; 
let successInviteList = [], failedInviteList = []; 

const startButton = document.getElementById('startButton'); 
const stopButton = document.getElementById('stopButton'); 
const logArea = document.getElementById('logArea'); 
const getCurrentBmBtn = document.getElementById('getCurrentBmBtn'); 
const clearLogsBtn = document.getElementById('clearLogsBtn'); 
const copySuccessBtn = document.getElementById('copySuccessBtn'); 
const copyFailBtn = document.getElementById('copyFailBtn'); 
const copySection = document.getElementById('copySection'); 

const bmIdInput = document.getElementById('bmIdInput'); 
const userListInput = document.getElementById('userListInput'); 
const roleSelect = document.getElementById('roleSelect'); 
const threadsInput = document.getElementById('threadsInput'); 
const delayMinInput = document.getElementById('delayMinInput'); 
const delayMaxInput = document.getElementById('delayMaxInput'); 

// Hàm log 
const logToUI = (message, ...args) => { 
    const line = document.createElement('div'); 
    const fullMessage = [message, ...args].map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '); 
    
    if (fullMessage.includes('✅') || fullMessage.includes('Success') || fullMessage.includes('thành công')) { 
        line.className = 'ta-log-entry ta-log-success'; 
    } else if (fullMessage.includes('❌') || fullMessage.includes('Error') || fullMessage.includes('Lỗi')) { 
        line.className = 'ta-log-entry ta-log-error'; 
    } else if (fullMessage.includes('🔄') || fullMessage.includes('Processing') || fullMessage.includes('▶️')) { 
        line.className = 'ta-log-entry ta-log-info'; 
    } else if (fullMessage.includes('⛔') || fullMessage.includes('⚠️') || fullMessage.includes('Warning')) { 
        line.className = 'ta-log-entry ta-log-warning'; 
    } else if (fullMessage.includes('⭐') || fullMessage.includes('TREND')) { 
        line.className = 'ta-log-entry ta-log-gold'; 
    } else { 
        line.className = 'ta-log-entry'; 
    } 
    
    const timestamp = new Date().toLocaleTimeString(); 
    line.innerHTML = `[${timestamp}] ${fullMessage}`; 
    logArea.appendChild(line); 
    logArea.scrollTop = logArea.scrollHeight; 
}; 

// Lấy BM hiện tại dari URL 
function getCurrentBmFromUrl() { 
    try { 
        const urlParams = new URLSearchParams(window.location.search); 
        const businessId = urlParams.get('business_id'); 
        if (businessId) { 
            bmIdInput.value = businessId; 
            logToUI(`✅ Loaded BM ID: ${businessId}`); 
        } else { 
            logToUI('⚠️ No BM ID found in URL'); 
        } 
    } catch (e) { 
        logToUI('❌ Error loading BM ID:', e.message); 
    } 
} 

// Sao chép danh sách 
function copyToClipboard(list, button) { 
    const text = list.join('\n'); 
    if (!text) { alert('No data to copy!'); return; } 
    navigator.clipboard.writeText(text).then(() => { 
        const originalText = button.innerHTML; 
        button.innerHTML = '✅ Copied!'; 
        setTimeout(() => { button.innerHTML = originalText; }, 2000); 
    }).catch(() => { alert('Failed to copy!'); }); 
} 

// Delay có thể hủy 
function cancellableDelay(ms) { 
    return new Promise(resolve => { 
        const interval = setInterval(() => { 
            if (stopRequested) { clearInterval(interval); resolve(); } 
        }, 100); 
        setTimeout(() => { clearInterval(interval); resolve(); }, ms); 
    }); 
} 

// Gọi Graph API để mời user 
async function inviteUserToBM(businessId, userIdOrEmail, role = 'employee', accessToken) { 
    const url = `https://graph.facebook.com/v19.0/${businessId}/invited_users`; 
    let data = { user: userIdOrEmail, role, access_token: accessToken }; 
    if (userIdOrEmail.includes('@')) data.email = userIdOrEmail; 

    try { 
        const formData = new URLSearchParams(data); 
        const response = await fetch(url, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            body: formData.toString(), 
            credentials: 'include' 
        }); 
        if (!response.ok) { 
            const errorData = await response.json(); 
            return { status: false, error: errorData.error?.message || `HTTP ${response.status}` }; 
        } 
        const result = await response.json(); 
        if (result.success || result.id) { 
            return { status: true, data: result }; 
        } 
        return { status: false, error: result.error?.message || 'Failed to invite user' }; 
    } catch (e) { 
        return { status: false, error: e.message }; 
    } 
} 

// Kiểm tra user đã được mời chưa 
async function checkUserInvited(businessId, userId, accessToken) { 
    const url = `https://graph.facebook.com/v19.0/${businessId}/invited_users?user_id=${userId}&access_token=${accessToken}`; 
    try { 
        const response = await fetch(url, { credentials: 'include' }); 
        if (!response.ok) return { status: false, error: `HTTP ${response.status}` }; 
        const data = await response.json(); 
        return { status: true, invited: data.data && data.data.length > 0, data: data.data }; 
    } catch (e) { 
        return { status: false, error: e.message }; 
    } 
} 

// Lấy danh sách user đã mời 
async function getInvitedUsers(businessId, accessToken) { 
    const url = `https://graph.facebook.com/v19.0/${businessId}/invited_users?access_token=${accessToken}`; 
    try { 
        const response = await fetch(url, { credentials: 'include' }); 
        if (!response.ok) return { status: false, error: `HTTP ${response.status}` }; 
        const data = await response.json(); 
        return { status: true, users: data.data || [], paging: data.paging }; 
    } catch (e) { 
        return { status: false, error: e.message }; 
    } 
} 

// LOGIC CHÍNH 
async function startProcess() { 
    isRunning = true; 
    stopRequested = false; 
    startButton.disabled = true; 
    stopButton.disabled = false; 
    logArea.innerHTML = ''; 
    copySection.style.display = 'none'; 
    successInviteList = []; 
    failedInviteList = []; 

    try { 
        const accessToken = require('WebApiApplication')['getAccessToken'](); 
        if (!accessToken) throw new Error('Unable to get Access Token. Please refresh the page.'); 
        logToUI('✅ Access token obtained successfully'); 

        const businessId = bmIdInput.value.trim(); 
        if (!businessId) throw new Error('Please enter Business Manager ID'); 
        logToUI(`📋 BM ID: ${businessId}`); 

        const selectedAction = document.querySelector('input[name="action"]:checked').value; 

        if (selectedAction === 'check') { 
            const users = userListInput.value.split('\n').map(line => line.trim()).filter(id => id); 
            if (users.length === 0) throw new Error('Please enter users to check'); 
            logToUI(`🔍 Checking ${users.length} users...`); 
            
            for (const user of users) { 
                if (stopRequested) break; 
                const result = await checkUserInvited(businessId, user, accessToken); 
                if (result.status && result.invited) { 
                    logToUI(`✅ User ${user} is already invited`); 
                } else { 
                    logToUI(`❌ User ${user} is not invited yet`); 
                } 
                await cancellableDelay(500); 
            } 
            return; 
        } 

        if (selectedAction === 'list') { 
            logToUI('🔍 Fetching invited users list...'); 
            const result = await getInvitedUsers(businessId, accessToken); 
            if (result.status && result.users.length > 0) { 
                logToUI(`📋 ${result.users.length} invited users found:`); 
                result.users.forEach((u, i) => { 
                    const role = u.role || 'employee'; 
                    logToUI(`${i+1}. ${u.id || u.email || 'N/A'} - Role: ${role}`); 
                }); 
                const userIds = result.users.map(u => u.id || u.email).filter(Boolean); 
                if (userIds.length > 0) { 
                    copySection.style.display = 'flex'; 
                    copySuccessBtn.innerHTML = `📋 Copy ${userIds.length} IDs`; 
                    copySuccessBtn.onclick = () => copyToClipboard(userIds, copySuccessBtn); 
                } 
            } else { 
                logToUI('⚠️ No invited users found'); 
            } 
            return; 
        } 

        // INVITE ACTION 
        const users = userListInput.value.split('\n').map(line => line.trim()).filter(id => id); 
        if (users.length === 0) throw new Error('Please enter users to invite'); 

        const role = roleSelect.value; 
        const threadCount = Math.min(+threadsInput.value || 2, users.length, 10); 
        const delayMin = +delayMinInput.value || 2; 
        const delayMax = +delayMaxInput.value || 5; 

        logToUI(`🚀 Starting to invite ${users.length} users to BM ${businessId}`); 
        logToUI(`⚙️ Role: ${role.toUpperCase()} | Threads: ${threadCount} | Delay: ${delayMin}-${delayMax}s`); 
        logToUI('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'); 

        let userIndex = 0; 
        let processed = 0; 

        async function worker() { 
            while (userIndex < users.length && !stopRequested) { 
                const currentIndex = userIndex++; 
                const user = users[currentIndex]; 
                processed++; 

                logToUI(`🔄 [${processed}/${users.length}] Inviting: ${user}...`); 

                const checkResult = await checkUserInvited(businessId, user, accessToken); 
                if (checkResult.status && checkResult.invited) { 
                    logToUI(`   ⚠️ ${user} is already invited, skipping`); 
                    continue; 
                } 

                const result = await inviteUserToBM(businessId, user, role, accessToken); 
                if (result.status) { 
                    logToUI(`   ✅ Successfully invited ${user} as ${role.toUpperCase()}`); 
                    successInviteList.push(user); 
                } else { 
                    logToUI(`   ❌ Failed to invite ${user}: ${result.error}`); 
                    failedInviteList.push(user); 
                } 

                if (currentIndex < users.length - 1 && !stopRequested) { 
                    const randomDelay = Math.floor(Math.random() * (delayMax - delayMin + 1)) + delayMin; 
                    await cancellableDelay(randomDelay * 1000); 
                } 
            } 
        } 

        const workers = []; 
        for (let i = 0; i < threadCount; i++) { 
            workers.push(worker()); 
        } 
        await Promise.all(workers); 

        logToUI('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'); 
        logToUI('📊 FINAL SUMMARY 📊'); 
        logToUI(`✅ Successfully invited: ${successInviteList.length} users`); 
        logToUI(`❌ Failed to invite: ${failedInviteList.length} users`); 

        if (successInviteList.length > 0 || failedInviteList.length > 0) { 
            copySection.style.display = 'flex'; 
            copySuccessBtn.innerHTML = `✅ Copy Success (${successInviteList.length})`; 
            copyFailBtn.innerHTML = `❌ Copy Failed (${failedInviteList.length})`; 
            copySuccessBtn.onclick = () => copyToClipboard(successInviteList, copySuccessBtn); 
            copyFailBtn.onclick = () => copyToClipboard(failedInviteList, copyFailBtn); 
        } 

    } catch (e) { 
        logToUI('❌ CRITICAL ERROR:', e.message); 
    } finally { 
        if (stopRequested) { 
            logToUI('🛑 PROCESS STOPPED BY USER REQUEST 🛑'); 
        } else { 
            logToUI('✅======== PROCESS COMPLETED ========✅'); 
            logToUI('⭐ Thank you for using TREND AGENCY! ⭐'); 
        } 
        isRunning = false; 
        startButton.disabled = false; 
        stopButton.disabled = true; 
    } 
} 

// GÁN SỰ KIỆN 
getCurrentBmBtn.addEventListener('click', getCurrentBmFromUrl); 

clearLogsBtn.addEventListener('click', () => { 
    logArea.innerHTML = ''; 
    logToUI('🗑️ Logs cleared'); 
    logToUI('⏳ Ready...'); 
}); 

startButton.addEventListener('click', () => { 
    if (isRunning) return; 
    startProcess(); 
}); 

stopButton.addEventListener('click', () => { 
    if (isRunning) { 
        logToUI('🛑 Stop requested...'); 
        stopRequested = true; 
        stopButton.disabled = true; 
    } 
}); 

container.querySelector('.ta-close-btn').addEventListener('click', () => { 
    if (!stopRequested && isRunning) { 
        if (confirm("Tool is running. Are you sure you want to close?")) { 
            stopRequested = true; 
            setTimeout(() => { container.remove(); styleEl.remove(); }, 1000); 
        } 
    } else { 
        container.remove(); 
        styleEl.remove(); 
    } 
}); 

let isDragging = false, offsetX, offsetY; 
const header = container.querySelector(".ta-header"); 
header.onmousedown = (e) => { 
    if (!e.target.closest('.ta-close-btn')) { 
        isDragging = true; 
        offsetX = e.clientX - container.getBoundingClientRect().left; 
        offsetY = e.clientY - container.getBoundingClientRect().top; 
        container.style.transform = 'none'; 
    } 
}; 
document.onmousemove = (e) => { 
    if (isDragging) { 
        container.style.left = `${e.clientX - offsetX}px`; 
        container.style.top = `${e.clientY - offsetY}px`; 
    } 
}; 
document.onmouseup = () => { isDragging = false; }; 

getCurrentBmFromUrl(); 
logToUI('✅ Tool is ready!'); 
logToUI('💡 Enter users and click "Start"'); 

})();
