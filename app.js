/* ==========================================================================
   STATE MANAGEMENT
   ========================================================================== */
const DEFAULT_TASKS = [
    {
        id: 1,
        title: "Finish Math Assignment",
        due: "Today, 10:00 AM",
        priority: "High",
        category: "Study",
        time: "10:00 AM",
        reminder: "15 mins before",
        completed: false,
        subtasks: [
            { text: "Solve equations", completed: false },
            { text: "Graph questions", completed: false },
            { text: "Word problems", completed: false },
            { text: "Review answers", completed: false }
        ]
    },
    {
        id: 2,
        title: "Read 20 Pages",
        due: "Today, 12:00 PM",
        priority: "Medium",
        category: "Study",
        time: "12:00 PM",
        reminder: "15 mins before",
        completed: false,
        subtasks: [
            { text: "Read science chapter 3", completed: false }
        ]
    },
    {
        id: 3,
        title: "Gym Workout",
        due: "Today, 6:00 PM",
        priority: "Medium",
        category: "Health",
        time: "6:00 PM",
        reminder: "None",
        completed: false,
        subtasks: []
    },
    {
        id: 4,
        title: "Call Mom",
        due: "Today, 8:00 PM",
        priority: "Low",
        category: "Personal",
        time: "8:00 PM",
        reminder: "None",
        completed: false,
        subtasks: []
    },
    {
        id: 5,
        title: "Prepare Presentation",
        due: "Tomorrow",
        priority: "High",
        category: "Work",
        time: "Tomorrow",
        reminder: "1 hour before",
        completed: false,
        subtasks: []
    },
    {
        id: 6,
        title: "Buy Groceries",
        due: "Tomorrow",
        priority: "Low",
        category: "Personal",
        time: "Tomorrow",
        reminder: "None",
        completed: false,
        subtasks: []
    }
];

const DEFAULT_FRIENDS = [
    {
        id: "priya",
        name: "Priya",
        level: 15,
        status: "online",
        streak: 12,
        focusTime: "18h 30m",
        mascot: "pink",
        achievements: ["focus-master", "early-bird", "streak-hero", "helper"]
    },
    {
        id: "rohan",
        name: "Rohan",
        level: 12,
        status: "focusing",
        streak: 5,
        focusTime: "10h 15m",
        mascot: "default",
        achievements: ["focus-master", "early-bird"]
    },
    {
        id: "ananya",
        name: "Ananya",
        level: 8,
        status: "online",
        streak: 3,
        focusTime: "4h 45m",
        mascot: "default",
        achievements: ["early-bird"]
    },
    {
        id: "arjun",
        name: "Arjun",
        level: 10,
        status: "offline",
        streak: 8,
        focusTime: "12h 20m",
        mascot: "default",
        achievements: ["focus-master", "streak-hero"]
    }
];

class AppState {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('dino_tasks')) || DEFAULT_TASKS;
        this.friends = DEFAULT_FRIENDS;
        
        this.xp = parseInt(localStorage.getItem('dino_xp')) || 620;
        this.level = parseInt(localStorage.getItem('dino_level')) || 12;
        this.streak = parseInt(localStorage.getItem('dino_streak')) || 7;
        this.energy = parseInt(localStorage.getItem('dino_energy')) || 3;
        
        this.selectedTaskId = null;
        this.selectedFriendId = 'priya';
        
        this.activeFlow = 'home'; // home, tasks, focus, friends, settings
        
        // Profile Info
        this.userFullName = localStorage.getItem('dino_userFullName') || 'Sawmiyaa';
        this.userName = localStorage.getItem('dino_userName') || 'Sawmiyaa';
        this.userEmail = localStorage.getItem('dino_userEmail') || 'sawmiyaa@example.com';
        this.userPhone = localStorage.getItem('dino_userPhone') || '';
        this.userBio = localStorage.getItem('dino_userBio') || 'Hi! I am a passionate dinosaur trainer and productivity enthusiast. I love checking off tasks and leveling up every day. Let\'s be study buddies and crush our goals together! 🦕✨';
        this.userOccupation = localStorage.getItem('dino_userOccupation') || 'Student';
        this.userLocation = localStorage.getItem('dino_userLocation') || 'Earth';
        this.userPrefLang = localStorage.getItem('dino_userPrefLang') || '';
        this.userSpokenLang = localStorage.getItem('dino_userSpokenLang') || '';
        this.userDob = localStorage.getItem('dino_userDob') || '2000-01-01';
        this.userAvatar = localStorage.getItem('dino_userAvatar') || 'dino-default';
        
        this.prefs = JSON.parse(localStorage.getItem('dino_prefs')) || {
            taskReminders: true,
            dailyDigest: false,
            focusAlerts: true,
            sounds: true,
            animations: true,
            friendTasks: true,
            friendFocus: true,
            friendStudy: true,
            publicProfile: false,
            showOnlineStatus: true,
            shareActivity: true,
            blockRequests: false,
            twoFactor: false,
            incognito: false
        };
        
        // Timer settings
        this.focusTimer = {
            totalSeconds: 25 * 60,
            secondsLeft: 25 * 60,
            state: 'idle', // idle, running, paused
            interval: null,
            mode: 'pomodoro' // pomodoro, short-break, long-break
        };
    }

    saveTasks() {
        localStorage.setItem('dino_tasks', JSON.stringify(this.tasks));
    }
    
    saveProfile() {
        localStorage.setItem('dino_userFullName', this.userFullName);
        localStorage.setItem('dino_userName', this.userName);
        localStorage.setItem('dino_userEmail', this.userEmail);
        localStorage.setItem('dino_userPhone', this.userPhone);
        localStorage.setItem('dino_userBio', this.userBio);
        localStorage.setItem('dino_userOccupation', this.userOccupation);
        localStorage.setItem('dino_userLocation', this.userLocation);
        localStorage.setItem('dino_userPrefLang', this.userPrefLang);
        localStorage.setItem('dino_userSpokenLang', this.userSpokenLang);
        localStorage.setItem('dino_userDob', this.userDob);
        localStorage.setItem('dino_userAvatar', this.userAvatar);
    }
    
    savePrefs() {
        localStorage.setItem('dino_prefs', JSON.stringify(this.prefs));
    }

    saveStats() {
        localStorage.setItem('dino_xp', this.xp);
        localStorage.setItem('dino_level', this.level);
        localStorage.setItem('dino_streak', this.streak);
        localStorage.setItem('dino_energy', this.energy);
    }

    addXP(amount) {
        this.xp += amount;
        if (this.xp >= 1000) {
            this.level += 1;
            this.xp = this.xp - 1000;
            alert(`🎉 Level Up! You reached Level ${this.level}!`);
        }
        this.saveStats();
    }

    addEnergy(amount) {
        this.energy = Math.min(5, this.energy + amount);
        this.saveStats();
    }

    useEnergy() {
        if (this.energy > 0) {
            this.energy -= 1;
            this.saveStats();
            return true;
        }
        return false;
    }
}

const state = new AppState();


/* ==========================================================================
   WEB AUDIO SYNTHESIZER ENGINE (No external audio dependencies!)
   ========================================================================== */
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.musicSource = null;
        this.ambientSource = null;
        this.lofiInterval = null;
        this.ambienceFilterNode = null;
        this.ambientGain = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playLofiBeats() {
        this.init();
        this.stopLofiBeats();

        // Synth instrument
        let bpm = 80;
        let stepTime = 60 / bpm; // 0.75s per beat
        let barTime = stepTime * 4;

        // Simple chord progression: Cmaj7 - Am7 - Fmaj7 - G6
        const progressions = [
            [60, 64, 67, 71], // Cmaj7
            [57, 60, 64, 67], // Am7
            [53, 57, 60, 64], // Fmaj7
            [55, 59, 62, 64]  // G6
        ];

        let chordIndex = 0;

        const playChord = (chord, time) => {
            chord.forEach(midiNote => {
                let freq = 440 * Math.pow(2, (midiNote - 69) / 12);
                
                // Soft oscillator
                let osc = this.ctx.createOscillator();
                let filter = this.ctx.createBiquadFilter();
                let gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, time);

                // Low-pass filter for cozy warm lofi sound
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(500, time);
                filter.Q.setValueAtTime(1, time);

                // Slow attack, long decay
                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.12, time + 0.5);
                gain.gain.exponentialRampToValueAtTime(0.001, time + barTime - 0.1);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(time);
                osc.stop(time + barTime);
            });
        };

        // Beat loop
        const scheduler = () => {
            let nextChordTime = this.ctx.currentTime;
            playChord(progressions[chordIndex], nextChordTime);
            
            // Add a soft kick/snare beat
            // Kick at beat 1 and 3
            this.triggerDrum('kick', nextChordTime);
            this.triggerDrum('kick', nextChordTime + stepTime * 2);
            // Snare at beat 2 and 4
            this.triggerDrum('snare', nextChordTime + stepTime);
            this.triggerDrum('snare', nextChordTime + stepTime * 3);

            chordIndex = (chordIndex + 1) % progressions.length;
        };

        // Run immediately and setup interval
        scheduler();
        this.lofiInterval = setInterval(scheduler, barTime * 1000);
    }

    triggerDrum(type, time) {
        if (type === 'kick') {
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            
            osc.frequency.setValueAtTime(150, time);
            osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);
            
            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(time);
            osc.stop(time + 0.35);
        } else if (type === 'snare') {
            // White noise burst
            let bufferSize = this.ctx.sampleRate * 0.15;
            let buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            let data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            let noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            
            let filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1000, time);
            
            let gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.12, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
            
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            
            noise.start(time);
            noise.stop(time + 0.15);
        }
    }

    stopLofiBeats() {
        if (this.lofiInterval) {
            clearInterval(this.lofiInterval);
            this.lofiInterval = null;
        }
    }

    playAmbientNoise(type) {
        this.init();
        this.stopAmbientNoise();

        // Generate continuous white noise buffer
        let bufferSize = this.ctx.sampleRate * 2;
        let buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        let data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        this.ambientSource = this.ctx.createBufferSource();
        this.ambientSource.buffer = buffer;
        this.ambientSource.loop = true;

        this.ambienceFilterNode = this.ctx.createBiquadFilter();
        this.ambientGain = this.ctx.createGain();

        // Adjust settings based on environment type
        if (type === 'rain') {
            this.ambienceFilterNode.type = 'lowpass';
            this.ambienceFilterNode.frequency.setValueAtTime(400, this.ctx.currentTime);
            this.ambientGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        } else if (type === 'cafe') {
            // Low-pass filtered noise + random murmur filter peaks
            this.ambienceFilterNode.type = 'bandpass';
            this.ambienceFilterNode.frequency.setValueAtTime(800, this.ctx.currentTime);
            this.ambientGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        } else if (type === 'nature') {
            this.ambienceFilterNode.type = 'lowpass';
            this.ambienceFilterNode.frequency.setValueAtTime(700, this.ctx.currentTime);
            this.ambientGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        } else {
            // Night: deep sub-rumble + high cricket tone clicks
            this.ambienceFilterNode.type = 'lowpass';
            this.ambienceFilterNode.frequency.setValueAtTime(250, this.ctx.currentTime);
            this.ambientGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        }

        this.ambientSource.connect(this.ambienceFilterNode);
        this.ambienceFilterNode.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);

        this.ambientSource.start(0);
    }

    setAmbientVolume(pct) {
        if (this.ambientGain && this.ctx) {
            this.ambientGain.gain.setValueAtTime((pct / 100) * 0.3, this.ctx.currentTime);
        }
    }

    stopAmbientNoise() {
        if (this.ambientSource) {
            try {
                this.ambientSource.stop();
            } catch (e) {}
            this.ambientSource = null;
        }
    }
}

const audio = new AudioEngine();


/* ==========================================================================
   UI RENDERING FUNCTIONS
   ========================================================================== */

// 1. Refresh Status Badges & XP Bars
function refreshStatsUI() {
    document.getElementById('val-streak').innerText = state.streak;
    document.getElementById('val-xp').innerText = state.xp;
    document.getElementById('val-energy').innerText = state.energy;

    // Sidebar card sync
    const barProgress = document.querySelectorAll('.xp-bar-progress');
    barProgress.forEach(bar => {
        bar.style.width = `${(state.xp / 1000) * 100}%`;
    });
    const labelXp = document.querySelector('.sidebar-profile-card .profile-footer span');
    if (labelXp) {
        labelXp.innerText = `${state.xp} / 1000 XP`;
    }
    
    // Count active tasks for welcome banner
    const pendingTasks = state.tasks.filter(t => !t.completed).length;
    document.getElementById('todo-count-banner').innerText = `${pendingTasks} task${pendingTasks === 1 ? '' : 's'}`;
    document.getElementById('task-badge-count').innerText = pendingTasks;
}

// 2. Render Home Flow Task Preview List
function renderHomeTasks() {
    const listContainer = document.getElementById('home-tasks-list');
    listContainer.innerHTML = '';

    const pending = state.tasks.filter(t => !t.completed).slice(0, 5);

    if (pending.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center" style="padding: 16px; color: var(--text-muted); font-size: 13px;">
                🎉 All tasks completed! Good job!
            </div>
        `;
        return;
    }

    pending.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-mini-item';
        item.setAttribute('data-id', task.id);
        
        item.innerHTML = `
            <div class="task-mini-left">
                <span class="priority-dot ${task.priority.toLowerCase()}"></span>
                <span class="task-mini-title">${task.title}</span>
            </div>
            <div class="task-mini-right">${task.time || task.due}</div>
        `;

        item.addEventListener('click', () => {
            state.selectedTaskId = task.id;
            switchTab('tasks');
            renderMainTasksList();
            renderTaskDetails();
        });

        listContainer.appendChild(item);
    });
}

// 3. Render Main Tasks Tab List
function renderMainTasksList() {
    const container = document.getElementById('main-tasks-container');
    const searchVal = document.getElementById('task-search-input').value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    container.innerHTML = '';

    let filtered = state.tasks;

    // Search filter
    if (searchVal) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchVal));
    }

    // Tab category filter
    if (activeFilter === 'today') {
        filtered = filtered.filter(t => t.due.toLowerCase().includes('today') && !t.completed);
    } else if (activeFilter === 'upcoming') {
        filtered = filtered.filter(t => !t.due.toLowerCase().includes('today') && !t.completed);
    } else if (activeFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center" style="padding: 32px 16px; color: var(--text-muted); font-size: 13px;">
                No tasks found here.
            </div>
        `;
        return;
    }

    filtered.forEach(task => {
        const row = document.createElement('div');
        row.className = `task-item-row ${task.completed ? 'completed' : ''} ${state.selectedTaskId === task.id ? 'active' : ''}`;
        row.setAttribute('data-id', task.id);

        row.innerHTML = `
            <div class="task-check-wrap">
                <div class="custom-checkbox">${task.completed ? '✓' : ''}</div>
                <div class="task-meta-block">
                    <span class="task-text">${task.title}</span>
                    <span class="task-time-lbl">${task.time || task.due}</span>
                </div>
            </div>
            <span class="priority-tag ${task.priority.toLowerCase()}">${task.priority}</span>
        `;

        // Checkbox click completes task directly
        row.querySelector('.custom-checkbox').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTaskCompleted(task.id);
        });

        // Row click opens details
        row.addEventListener('click', () => {
            state.selectedTaskId = task.id;
            document.querySelectorAll('.task-item-row').forEach(r => r.classList.remove('active'));
            row.classList.add('active');
            renderTaskDetails();
        });

        container.appendChild(row);
    });
}

// Toggle Task Complete State
function toggleTaskCompleted(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
        const targetCompleted = !task.completed;
        if (targetCompleted) {
            // Check if we can animate
            const taskEl = document.querySelector(`.task-item-row[data-id="${id}"]`);
            if (state.activeFlow === 'tasks' && taskEl) {
                // Run complete task animation first!
                animateCompleteTask(id, () => {
                    task.completed = true;
                    state.addXP(20);
                    state.addEnergy(1);
                    triggerCompletedState(task.title);
                });
            } else {
                // Completed instantly without animation
                task.completed = true;
                state.addXP(20);
                state.addEnergy(1);
                triggerCompletedState(task.title);
            }
        } else {
            task.completed = false;
            state.saveTasks();
            refreshStatsUI();
            renderHomeTasks();
            renderMainTasksList();
            renderTaskDetails();
        }
    }
}

// 4. Render Task Details pane states
function renderTaskDetails() {
    const emptyState = document.getElementById('details-state-empty');
    const viewState = document.getElementById('details-state-view');
    const actionState = document.getElementById('details-state-action');
    const completedState = document.getElementById('details-state-completed');

    // Hide all first
    emptyState.classList.remove('active');
    viewState.classList.remove('active');
    actionState.classList.remove('active');
    completedState.classList.remove('active');

    if (!state.selectedTaskId) {
        emptyState.classList.add('active');
        return;
    }

    const task = state.tasks.find(t => t.id === state.selectedTaskId);
    if (!task) {
        emptyState.classList.add('active');
        return;
    }

    // Load Task Details
    viewState.classList.add('active');
    
    document.getElementById('det-title').innerText = task.title;
    document.getElementById('det-desc').innerText = task.desc || "No description provided.";
    document.getElementById('det-due').innerText = `Due ${task.due}`;
    
    // Priority badge
    const pBadge = document.getElementById('det-priority');
    pBadge.className = `badge-priority priority-${task.priority.toLowerCase()}`;
    pBadge.innerText = `${task.priority} Priority`;

    // Render subtasks checklist
    const subContainer = document.getElementById('det-subtasks-container');
    subContainer.innerHTML = '';

    if (!task.subtasks || task.subtasks.length === 0) {
        subContainer.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); font-style: italic;">No subtasks created.</p>`;
    } else {
        task.subtasks.forEach((sub, idx) => {
            const subRow = document.createElement('div');
            subRow.className = `subtask-item ${sub.completed ? 'completed' : ''}`;
            subRow.innerHTML = `
                <div class="custom-checkbox" style="margin-top: 0; width: 14px; height: 14px; font-size: 8px;">${sub.completed ? '✓' : ''}</div>
                <span>${sub.text}</span>
            `;

            subRow.addEventListener('click', () => {
                sub.completed = !sub.completed;
                state.saveTasks();
                renderTaskDetails();
            });

            subContainer.appendChild(subRow);
        });
    }
}

// 5. Simulated Task in Action / Confetti completes
let actionTimerInterval = null;
function startSimulatedTask() {
    const task = state.tasks.find(t => t.id === state.selectedTaskId);
    if (!task) return;

    // Switch details pane to state B (In Action)
    document.getElementById('details-state-view').classList.remove('active');
    const actionState = document.getElementById('details-state-action');
    actionState.classList.add('active');

    document.getElementById('action-task-title').innerText = task.title;
    document.getElementById('action-sign-title').innerText = task.title;

    // Run a fast simulation (15 seconds)
    let secs = 15;
    const progressFill = document.getElementById('action-progress-bar');
    const clock = document.getElementById('action-timer-countdown');

    progressFill.style.width = '0%';
    clock.innerText = `00:${secs < 10 ? '0' : ''}${secs}`;

    if (actionTimerInterval) clearInterval(actionTimerInterval);

    actionTimerInterval = setInterval(() => {
        secs -= 1;
        clock.innerText = `00:${secs < 10 ? '0' : ''}${secs}`;
        
        const pct = ((15 - secs) / 15) * 100;
        progressFill.style.width = `${pct}%`;

        // Update home dashboard mini buddy progress simultaneously
        document.getElementById('buddy-work-progress').style.width = `${pct}%`;
        document.getElementById('buddy-work-pct').innerText = `${Math.round(pct)}%`;

        if (secs <= 0) {
            clearInterval(actionTimerInterval);
            
            // Mark task as completed
            task.completed = true;
            state.addXP(20);
            state.addEnergy(1);

            triggerCompletedState(task.title);
        }
    }, 1000);
}

function triggerCompletedState(title) {
    if (actionTimerInterval) clearInterval(actionTimerInterval);

    // Show celebratory Confetti screen
    document.getElementById('details-state-action').classList.remove('active');
    document.getElementById('details-state-view').classList.remove('active');
    document.getElementById('details-state-empty').classList.remove('active');
    
    const celebrationState = document.getElementById('details-state-completed');
    celebrationState.classList.add('active');

    // Trigger state changes & save
    state.saveTasks();
    refreshStatsUI();
    renderHomeTasks();
    renderMainTasksList();
}

function stopBuddyWorking() {
    if (actionTimerInterval) clearInterval(actionTimerInterval);
    document.getElementById('buddy-work-progress').style.width = '0%';
    document.getElementById('buddy-work-pct').innerText = '0%';
    renderTaskDetails();
}

// 6. Friends Flow Rendering
function renderFriendsList() {
    const container = document.getElementById('friends-list-container');
    const filter = document.querySelector('.fr-tab.active').getAttribute('data-fr-filter');
    
    container.innerHTML = '';

    let list = state.friends;
    if (filter === 'buddies') {
        list = list.filter(f => f.status === 'online' || f.status === 'focusing');
    }

    list.forEach(friend => {
        const item = document.createElement('div');
        item.className = `friend-item-row ${state.selectedFriendId === friend.id ? 'active' : ''}`;
        item.innerHTML = `
            <div class="friend-item-left">
                <div class="friend-list-avatar">
                    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
                        <use href="#dino-${friend.mascot}"/>
                    </svg>
                </div>
                <div class="friend-list-name-block">
                    <span class="friend-list-name">${friend.name}</span>
                    <span class="friend-list-lvl">Level ${friend.level}</span>
                </div>
            </div>
            <span class="friend-status-indicator ${friend.status}">${friend.status}</span>
        `;

        item.addEventListener('click', () => {
            state.selectedFriendId = friend.id;
            document.querySelectorAll('.friend-item-row').forEach(r => r.classList.remove('active'));
            item.classList.add('active');
            renderFriendProfile();
        });

        container.appendChild(item);
    });
}

function renderFriendProfile() {
    const friend = state.friends.find(f => f.id === state.selectedFriendId);
    if (!friend) return;

    document.getElementById('fr-prof-name').innerText = friend.name;
    document.getElementById('fr-prof-streak').innerText = `${friend.streak} days`;
    document.getElementById('fr-prof-focus').innerText = friend.focusTime;

    const dinoAvatar = document.querySelector('.friend-profile-dino use');
    if (dinoAvatar) {
        dinoAvatar.setAttribute('href', `#dino-${friend.mascot}`);
    }

    // Achievements badges
    const badges = document.querySelectorAll('.friend-achievements .badge-item');
    badges.forEach((b, idx) => {
        b.classList.remove('active');
        if (idx < friend.achievements.length) {
            b.classList.add('active');
        }
    });

    // Check if co-study room should display
    const coStudyRoom = document.getElementById('study-together-pane');
    const profilePane = document.getElementById('friend-profile-pane');
    
    if (friend.status === 'focusing' && friend.id === 'priya') {
        // Priya is focusing, show co-study invite or activate room
        coStudyRoom.style.display = 'none';
        profilePane.style.display = 'flex';
    } else {
        coStudyRoom.style.display = 'none';
        profilePane.style.display = 'flex';
    }
}


/* ==========================================================================
   INTERACTIVE TIMERS ENGINE (Pomodoro & Break)
   ========================================================================== */

function setupTimerListeners() {
    const durButtons = document.querySelectorAll('.btn-duration');
    durButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            durButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const val = btn.getAttribute('data-mins');
            if (val === 'custom') {
                document.getElementById('custom-duration-box').style.display = 'flex';
            } else {
                document.getElementById('custom-duration-box').style.display = 'none';
                state.focusTimer.totalSeconds = parseInt(val) * 60;
                state.focusTimer.secondsLeft = state.focusTimer.totalSeconds;
                updateClockDisplay();
            }
        });
    });

    document.getElementById('custom-min-input').addEventListener('input', (e) => {
        let mins = parseInt(e.target.value) || 25;
        mins = Math.max(1, Math.min(180, mins));
        state.focusTimer.totalSeconds = mins * 60;
        state.focusTimer.secondsLeft = state.focusTimer.totalSeconds;
        updateClockDisplay();
    });

    document.getElementById('btn-start-focus-session').addEventListener('click', startFocusSession);
    document.getElementById('btn-focus-pause').addEventListener('click', togglePauseTimer);
    document.getElementById('btn-focus-skip').addEventListener('click', skipTimer);
    
    document.getElementById('btn-break-skip').addEventListener('click', endBreakAndReset);
}

function updateClockDisplay() {
    // 1. Clock formats
    const minStr = Math.floor(state.focusTimer.secondsLeft / 60).toString().padStart(2, '0');
    const secStr = (state.focusTimer.secondsLeft % 60).toString().padStart(2, '0');
    const clockText = `${minStr}:${secStr}`;

    document.getElementById('focus-timer-clock').innerText = clockText;
    document.getElementById('break-timer-clock').innerText = clockText;
    document.getElementById('study-together-clock').innerText = clockText;

    // 2. Radial progress offset calculation
    const ring = document.getElementById('timer-progress-ring');
    const ringBreak = document.getElementById('break-progress-ring');
    
    const perimeter = 2 * Math.PI * 70; // 439.82
    const progressPct = state.focusTimer.secondsLeft / state.focusTimer.totalSeconds;
    const strokeDash = progressPct * perimeter;

    if (ring) {
        ring.style.strokeDasharray = `${perimeter}`;
        ring.style.strokeDashoffset = `${perimeter - strokeDash}`;
    }
    if (ringBreak) {
        ringBreak.style.strokeDasharray = `${perimeter}`;
        ringBreak.style.strokeDashoffset = `${perimeter - strokeDash}`;
    }
}

function startFocusSession() {
    state.focusTimer.state = 'running';
    document.getElementById('focus-setup-view').classList.remove('active');
    
    if (state.focusTimer.mode === 'pomodoro') {
        document.getElementById('focus-active-view').classList.add('active');
        document.getElementById('focus-break-view').classList.remove('active');
    } else {
        document.getElementById('focus-break-view').classList.add('active');
        document.getElementById('focus-active-view').classList.remove('active');
    }

    updateClockDisplay();
    runTimerLoop();
}

function runTimerLoop() {
    if (state.focusTimer.interval) clearInterval(state.focusTimer.interval);

    state.focusTimer.interval = setInterval(() => {
        if (state.focusTimer.state === 'running') {
            state.focusTimer.secondsLeft -= 1;
            updateClockDisplay();

            if (state.focusTimer.secondsLeft <= 0) {
                clearInterval(state.focusTimer.interval);
                handleTimerFinished();
            }
        }
    }, 1000);
}

function togglePauseTimer() {
    const btn = document.getElementById('btn-focus-pause');
    if (state.focusTimer.state === 'running') {
        state.focusTimer.state = 'paused';
        btn.innerText = '▶️';
    } else {
        state.focusTimer.state = 'running';
        btn.innerText = '⏸️';
    }
}

function skipTimer() {
    clearInterval(state.focusTimer.interval);
    handleTimerFinished();
}

function handleTimerFinished() {
    if (state.focusTimer.mode === 'pomodoro') {
        // Session complete, unlock break and show distraction modal
        state.addXP(50);
        state.addEnergy(2);
        
        // Open distraction blocked pop-up
        const modal = document.getElementById('modal-distractions-blocked');
        modal.classList.add('active');

        // Transition to break
        state.focusTimer.mode = 'short-break';
        state.focusTimer.totalSeconds = 5 * 60;
        state.focusTimer.secondsLeft = 5 * 60;
        
        document.getElementById('focus-active-view').classList.remove('active');
        document.getElementById('focus-break-view').classList.add('active');
        updateClockDisplay();
        
        // Autostart break
        startFocusSession();
    } else {
        // Break finished
        endBreakAndReset();
    }
}

function endBreakAndReset() {
    if (state.focusTimer.interval) clearInterval(state.focusTimer.interval);
    
    state.focusTimer.mode = 'pomodoro';
    state.focusTimer.state = 'idle';
    state.focusTimer.totalSeconds = 25 * 60;
    state.focusTimer.secondsLeft = 25 * 60;
    
    document.getElementById('focus-break-view').classList.remove('active');
    document.getElementById('focus-active-view').classList.remove('active');
    document.getElementById('focus-setup-view').classList.add('active');
    
    updateClockDisplay();
}


/* ==========================================================================
   NAVIGATION & UI EVENT HANDLERS
   ========================================================================== */

function switchTab(tabId) {
    state.activeFlow = tabId;

    // Toggle active sidebar item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        }
    });

    // Toggle visible panel
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    const activePanel = document.getElementById(`panel-${tabId}`);
    if (activePanel) {
        activePanel.classList.add('active');
    }

    // Set view title
    const titles = {
        'home': 'Home Flow',
        'tasks': 'Tasks Flow',
        'focus': 'Focus Flow',
        'friends': 'Friends Flow',
        'settings': 'My Profile'
    };
    document.getElementById('view-title').innerText = titles[tabId] || 'CuteToDo';
}

function refreshProfileUI() {
    // 1. Sidebar
    document.querySelector('.sidebar-header .user-name').innerText = state.userName;
    document.querySelector('.sidebar-profile-card .profile-name').innerText = state.userName;
    document.querySelector('.sidebar-header .avatar-svg use').setAttribute('href', `#${state.userAvatar}`);
    
    // 2. Home Tab Greeting
    const homeGreeting = document.querySelector('.welcome-text-side h2');
    if (homeGreeting) {
        homeGreeting.innerText = `Good morning, ${state.userName}! ✨`;
    }
    
    // 3. Settings Hero Card
    const heroName = document.getElementById('hero-user-name');
    const heroEmail = document.getElementById('hero-user-email');
    const heroDob = document.getElementById('hero-user-dob');
    const heroAvatar = document.getElementById('hero-avatar-use');
    
    if (heroName) heroName.innerText = state.userName;
    if (heroEmail) heroEmail.innerText = state.userEmail;
    if (heroDob) heroDob.innerText = state.userDob ? `DOB: ${state.userDob}` : '';
    if (heroAvatar) heroAvatar.setAttribute('href', `#${state.userAvatar}`);
}

function setupGlobalListeners() {
    // Mode toggler: Figma Board Layout vs Live App
    document.getElementById('btn-mode-interactive').addEventListener('click', () => {
        document.getElementById('btn-mode-figma').classList.remove('active');
        document.getElementById('btn-mode-interactive').classList.add('active');
        document.getElementById('figma-board-layout').classList.remove('active');
        document.getElementById('interactive-app-layout').classList.add('active');
    });

    document.getElementById('btn-mode-figma').addEventListener('click', () => {
        document.getElementById('btn-mode-interactive').classList.remove('active');
        document.getElementById('btn-mode-figma').classList.add('active');
        document.getElementById('interactive-app-layout').classList.remove('active');
        document.getElementById('figma-board-layout').classList.add('active');
    });

    // Sidebar navigation clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.classList.contains('disabled-nav')) return;
            const tab = item.getAttribute('data-tab');
            if (tab) switchTab(tab);
        });
    });

    // Profile Sidebar Header Click
    document.getElementById('btn-sidebar-profile')?.addEventListener('click', () => {
        switchTab('settings');
        // Deselect all sidebar nav items visually since this isn't in the nav list
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    });

    // Welcome Card links
    document.getElementById('btn-home-add-task').addEventListener('click', () => {
        document.getElementById('modal-add-task').classList.add('active');
    });
    
    document.getElementById('btn-home-ai-planner').addEventListener('click', () => {
        switchTab('tasks');
        const planPane = document.getElementById('tasks-ai-planner-pane');
        planPane.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('btn-view-all-tasks').addEventListener('click', () => {
        switchTab('tasks');
    });

    // Task details button handlers
    document.getElementById('btn-start-task-action').addEventListener('click', startSimulatedTask);
    document.getElementById('btn-stop-buddy-action').addEventListener('click', stopBuddyWorking);
    
    document.getElementById('btn-mark-done-action').addEventListener('click', () => {
        if (state.selectedTaskId) toggleTaskCompleted(state.selectedTaskId);
    });

    document.getElementById('btn-complete-awesome').addEventListener('click', () => {
        document.getElementById('details-state-completed').classList.remove('active');
        renderTaskDetails();
    });

    // Quick Action redirects
    document.getElementById('qa-focus').addEventListener('click', () => switchTab('focus'));
    document.getElementById('qa-world').addEventListener('click', () => {
        // Trigger buddy visit easter egg when clicking view world
        document.getElementById('modal-buddy-visit').classList.add('active');
    });

    // Modal Add Task Form triggers
    document.getElementById('btn-add-task-modal').addEventListener('click', () => {
        document.getElementById('modal-add-task').classList.add('active');
    });
    
    const closeModalAdd = () => {
        document.getElementById('modal-add-task').classList.remove('active');
        document.getElementById('task-title-input').value = '';
        document.getElementById('task-subtasks-input').value = '';
    };

    document.getElementById('btn-close-add-task').addEventListener('click', closeModalAdd);
    document.getElementById('btn-cancel-add-task').addEventListener('click', closeModalAdd);

    document.getElementById('btn-submit-add-task').addEventListener('click', () => {
        const title = document.getElementById('task-title-input').value.trim();
        if (!title) return;

        const date = document.getElementById('task-date-input').value;
        const timeVal = document.getElementById('task-time-input').value;
        const priority = document.getElementById('task-priority-input').value;
        const category = document.getElementById('task-category-input').value;
        const reminder = document.getElementById('task-reminder-input').value;
        
        const subtasksText = document.getElementById('task-subtasks-input').value.split('\n');
        const subtasks = subtasksText
            .map(t => t.trim())
            .filter(t => t.length > 0)
            .map(text => ({ text, completed: false }));

        const newTask = {
            id: Date.now(),
            title,
            due: date === 'Today' ? `Today, ${timeVal}` : date,
            priority,
            category,
            time: timeVal,
            reminder,
            completed: false,
            subtasks
        };

        state.tasks.unshift(newTask);
        state.saveTasks();
        
        closeModalAdd();
        refreshStatsUI();
        renderHomeTasks();
        renderMainTasksList();

        // Run add task animation!
        if (state.activeFlow === 'tasks') {
            animateAddTask(title, () => {
                // Done
            });
        }
    });

    // Search input typing
    document.getElementById('task-search-input').addEventListener('input', renderMainTasksList);

    // Filters inside Tasks list
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMainTasksList();
        });
    });

    // Friends Sub-tab filtering
    const frTabs = document.querySelectorAll('.fr-tab');
    frTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            frTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderFriendsList();
        });
    });

    // Close buttons for modals
    document.getElementById('btn-close-distractions').addEventListener('click', () => {
        document.getElementById('modal-distractions-blocked').classList.remove('active');
    });
    document.getElementById('btn-distractions-ack').addEventListener('click', () => {
        document.getElementById('modal-distractions-blocked').classList.remove('active');
    });

    document.getElementById('btn-close-visit').addEventListener('click', () => {
        document.getElementById('modal-buddy-visit').classList.remove('active');
    });
    document.getElementById('btn-visit-ack').addEventListener('click', () => {
        document.getElementById('modal-buddy-visit').classList.remove('active');
    });

    // Co-Study triggers
    document.getElementById('btn-send-message-mock').addEventListener('click', () => {
        // Toggle Co-Study Timer Room!
        document.getElementById('friend-profile-pane').style.display = 'none';
        
        const studyPane = document.getElementById('study-together-pane');
        studyPane.style.display = 'flex';
        
        // Sync timers with pomodoro if active
        if (state.focusTimer.state !== 'running') {
            state.focusTimer.totalSeconds = 25 * 60;
            state.focusTimer.secondsLeft = 25 * 60;
            startFocusSession();
        }
    });

    document.getElementById('btn-end-co-study').addEventListener('click', () => {
        document.getElementById('study-together-pane').style.display = 'none';
        document.getElementById('friend-profile-pane').style.display = 'flex';
        endBreakAndReset();
    });

    // AI Planner Apply Plan click
    document.getElementById('btn-apply-ai-plan').addEventListener('click', () => {
        const plannedTasks = [
            { id: Date.now() + 10, title: "Study Math - Algebra Review", due: "Today, 9:00 AM", priority: "High", category: "Study", completed: false, subtasks: [] },
            { id: Date.now() + 11, title: "Read 20 Pages - Science", due: "Today, 11:30 AM", priority: "Medium", category: "Study", completed: false, subtasks: [] },
            { id: Date.now() + 12, title: "Gym Workout Routine", due: "Today, 6:00 PM", priority: "Medium", category: "Health", completed: false, subtasks: [] }
        ];

        state.tasks.unshift(...plannedTasks);
        state.saveTasks();
        
        refreshStatsUI();
        renderHomeTasks();
        renderMainTasksList();
        
        alert("✨ AI Smart Plan applied to your task list!");
    });

    // Lo-Fi Player audio control
    const songItems = document.querySelectorAll('.song-item');
    const playBtn = document.getElementById('btn-play-music');
    const wave = document.getElementById('wave-visualizer');

    songItems.forEach(item => {
        item.addEventListener('click', () => {
            songItems.forEach(s => s.classList.remove('active'));
            item.classList.add('active');
            state.currentTrackIndex = parseInt(item.getAttribute('data-track'));
            
            if (state.isMusicPlaying) {
                audio.playLofiBeats();
            }
        });
    });

    playBtn.addEventListener('click', () => {
        state.isMusicPlaying = !state.isMusicPlaying;
        if (state.isMusicPlaying) {
            playBtn.innerText = '⏸️';
            wave.classList.add('playing');
            audio.playLofiBeats();
        } else {
            playBtn.innerText = '▶️';
            wave.classList.remove('playing');
            audio.stopLofiBeats();
        }
    });

    // Ambient noise synthesizers control
    const ambTabs = document.querySelectorAll('.ambience-tab');
    const toggleAmbBtn = document.getElementById('btn-toggle-ambience');
    const rainLayer = document.getElementById('rain-layer');

    ambTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ambTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const sound = tab.getAttribute('data-sound');

            if (sound === 'rain') {
                rainLayer.classList.add('active');
            } else {
                rainLayer.classList.remove('active');
            }

            if (state.ambientState === 'playing') {
                audio.playAmbientNoise(sound);
            }
        });
    });

    toggleAmbBtn.addEventListener('click', () => {
        if (state.ambientState === 'playing') {
            state.ambientState = 'idle';
            toggleAmbBtn.innerText = '▶️';
            audio.stopAmbientNoise();
        } else {
            state.ambientState = 'playing';
            toggleAmbBtn.innerText = '⏸️';
            const activeSound = document.querySelector('.ambience-tab.active').getAttribute('data-sound');
            audio.playAmbientNoise(activeSound);
        }
    });

    document.getElementById('ambience-volume').addEventListener('input', (e) => {
        audio.setAmbientVolume(e.target.value);
    });

    // Invite buddy easter egg for home world card
    document.getElementById('btn-open-world').addEventListener('click', () => {
        document.getElementById('modal-buddy-visit').classList.add('active');
    });

    // Edit Profile Modal logic
    const btnEditProfile = document.getElementById('btn-edit-profile');
    if (btnEditProfile) {
        btnEditProfile.addEventListener('click', () => {
            // Pre-fill form
            document.getElementById('edit-profile-fullname').value = state.userFullName;
            document.getElementById('edit-profile-name').value = state.userName;
            document.getElementById('edit-profile-email').value = state.userEmail;
            document.getElementById('edit-profile-phone').value = state.userPhone;
            document.getElementById('edit-profile-bio').value = state.userBio;
            document.getElementById('edit-profile-occupation').value = state.userOccupation;
            document.getElementById('edit-profile-location').value = state.userLocation;
            document.getElementById('edit-profile-preflang').value = state.userPrefLang;
            document.getElementById('edit-profile-spokenlang').value = state.userSpokenLang;
            document.getElementById('edit-profile-dob').value = state.userDob;
            
            // Pre-select avatar
            document.querySelectorAll('.avatar-option').forEach(opt => {
                opt.classList.remove('selected');
                if (opt.getAttribute('data-avatar') === state.userAvatar) {
                    opt.classList.add('selected');
                }
            });
            
            document.getElementById('modal-edit-profile').classList.add('active');
        });
    }
    
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });

    const closeEditProfile = () => {
        const modal = document.getElementById('modal-edit-profile');
        if (modal) modal.classList.remove('active');
    };
    document.getElementById('btn-close-edit-profile')?.addEventListener('click', closeEditProfile);
    document.getElementById('btn-cancel-edit-profile')?.addEventListener('click', closeEditProfile);

    document.getElementById('btn-save-profile')?.addEventListener('click', () => {
        state.userFullName = document.getElementById('edit-profile-fullname').value || '';
        state.userName = document.getElementById('edit-profile-name').value || 'Dino Trainer';
        state.userEmail = document.getElementById('edit-profile-email').value || '';
        state.userPhone = document.getElementById('edit-profile-phone').value || '';
        state.userBio = document.getElementById('edit-profile-bio').value || '';
        state.userOccupation = document.getElementById('edit-profile-occupation').value || '';
        state.userLocation = document.getElementById('edit-profile-location').value || '';
        state.userPrefLang = document.getElementById('edit-profile-preflang').value || '';
        state.userSpokenLang = document.getElementById('edit-profile-spokenlang').value || '';
        state.userDob = document.getElementById('edit-profile-dob').value || '';
        
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        if (selectedAvatar) {
            state.userAvatar = selectedAvatar.getAttribute('data-avatar');
        }
        
        state.saveProfile();
        refreshProfileUI();
        closeEditProfile();
    });

    // Notifications & Preferences Modal logic
    const btnOpenNotifications = document.getElementById('btn-open-notifications');
    if (btnOpenNotifications) {
        btnOpenNotifications.addEventListener('click', () => {
            // Pre-fill toggle switches
            document.getElementById('pref-task-reminders').checked = state.prefs.taskReminders;
            document.getElementById('pref-daily-digest').checked = state.prefs.dailyDigest;
            document.getElementById('pref-focus-alerts').checked = state.prefs.focusAlerts;
            document.getElementById('pref-sounds').checked = state.prefs.sounds;
            document.getElementById('pref-animations').checked = state.prefs.animations;
            document.getElementById('pref-friend-tasks').checked = state.prefs.friendTasks;
            document.getElementById('pref-friend-focus').checked = state.prefs.friendFocus;
            document.getElementById('pref-friend-study').checked = state.prefs.friendStudy;
            
            document.getElementById('modal-notifications').classList.add('active');
        });
    }

    const closeNotifications = () => {
        const modal = document.getElementById('modal-notifications');
        if (modal) modal.classList.remove('active');
    };
    document.getElementById('btn-close-notifications')?.addEventListener('click', closeNotifications);

    document.getElementById('btn-save-notifications')?.addEventListener('click', () => {
        state.prefs.taskReminders = document.getElementById('pref-task-reminders').checked;
        state.prefs.dailyDigest = document.getElementById('pref-daily-digest').checked;
        state.prefs.focusAlerts = document.getElementById('pref-focus-alerts').checked;
        state.prefs.sounds = document.getElementById('pref-sounds').checked;
        state.prefs.animations = document.getElementById('pref-animations').checked;
        state.prefs.friendTasks = document.getElementById('pref-friend-tasks').checked;
        state.prefs.friendFocus = document.getElementById('pref-friend-focus').checked;
        state.prefs.friendStudy = document.getElementById('pref-friend-study').checked;
        
        state.savePrefs();
        closeNotifications();
    });

    // Privacy & Security Modal logic
    const btnOpenPrivacy = document.getElementById('btn-open-privacy');
    if (btnOpenPrivacy) {
        btnOpenPrivacy.addEventListener('click', () => {
            // Pre-fill toggle switches
            document.getElementById('pref-public-profile').checked = state.prefs.publicProfile;
            document.getElementById('pref-online-status').checked = state.prefs.showOnlineStatus;
            document.getElementById('pref-share-activity').checked = state.prefs.shareActivity;
            document.getElementById('pref-block-requests').checked = state.prefs.blockRequests;
            document.getElementById('pref-2fa').checked = state.prefs.twoFactor;
            document.getElementById('pref-incognito').checked = state.prefs.incognito;
            
            document.getElementById('modal-privacy').classList.add('active');
        });
    }

    const closePrivacy = () => {
        const modal = document.getElementById('modal-privacy');
        if (modal) modal.classList.remove('active');
    };
    document.getElementById('btn-close-privacy')?.addEventListener('click', closePrivacy);

    document.getElementById('btn-save-privacy')?.addEventListener('click', () => {
        state.prefs.publicProfile = document.getElementById('pref-public-profile').checked;
        state.prefs.showOnlineStatus = document.getElementById('pref-online-status').checked;
        state.prefs.shareActivity = document.getElementById('pref-share-activity').checked;
        state.prefs.blockRequests = document.getElementById('pref-block-requests').checked;
        state.prefs.twoFactor = document.getElementById('pref-2fa').checked;
        state.prefs.incognito = document.getElementById('pref-incognito').checked;
        
        state.savePrefs();
        closePrivacy();
    });

    // Data Management Buttons
    document.getElementById('btn-export-data')?.addEventListener('click', () => {
        alert("Your data is being prepared for export. You'll receive an email shortly!");
    });
    
    document.getElementById('btn-delete-account')?.addEventListener('click', () => {
        if(confirm("Are you sure you want to permanently delete your account and all tasks? This cannot be undone!")) {
            alert("Account deletion requested. (Simulated)");
        }
    });

    // About & Help Modal logic
    const btnOpenAbout = document.getElementById('btn-open-about');
    if (btnOpenAbout) {
        btnOpenAbout.addEventListener('click', () => {
            document.getElementById('modal-about').classList.add('active');
        });
    }

    const closeAbout = () => {
        const modal = document.getElementById('modal-about');
        if (modal) modal.classList.remove('active');
    };
    document.getElementById('btn-close-about')?.addEventListener('click', closeAbout);
    document.getElementById('btn-close-about-footer')?.addEventListener('click', closeAbout);
}


/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    // Initial UI render
    refreshProfileUI();
    refreshStatsUI();
    renderHomeTasks();
    renderMainTasksList();
    renderFriendsList();
    renderFriendProfile();
    updateClockDisplay();
    
    // Setup listeners
    setupGlobalListeners();
    setupTimerListeners();
});


/* ==========================================================================
   SPRITE ANIMATION ENGINE (Dinosaur assigns and completes tasks)
   ========================================================================== */
function animateAddTask(title, onFinish) {
    const canvas = document.getElementById('tasks-anim-canvas');
    if (!canvas) {
        onFinish();
        return;
    }

    // 1. Create Dino facing front (walking to you)
    const dinoWrap = document.createElement('div');
    dinoWrap.className = 'anim-dino-wrapper walking-z'; // 3D walk towards screen
    dinoWrap.innerHTML = `
        <svg class="anim-dino-svg" viewBox="0 0 100 100">
            <use href="#dino-front"/>
        </svg>
    `;
    
    const taskScroll = document.createElement('div');
    taskScroll.className = 'anim-task-scroll';
    taskScroll.innerText = title;
    
    // Position near bottom center
    dinoWrap.style.left = '40%';
    dinoWrap.style.bottom = '-100px'; // Start below screen
    dinoWrap.style.transform = 'scale(0.8)';
    
    taskScroll.style.left = '45%';
    taskScroll.style.bottom = '-10px';
    taskScroll.style.transform = 'scale(0)';
    taskScroll.style.opacity = '0';
    
    canvas.appendChild(dinoWrap);
    canvas.appendChild(taskScroll);

    dinoWrap.offsetWidth;

    // Sequence 1: Walk to screen & receive task
    setTimeout(() => {
        dinoWrap.style.bottom = '80px';
        dinoWrap.style.transform = 'scale(1.2)';
    }, 50);

    setTimeout(() => {
        dinoWrap.classList.remove('walking-z');
        taskScroll.style.bottom = '120px';
        taskScroll.style.transform = 'scale(1)';
        taskScroll.style.opacity = '1';
    }, 1500);

    // Sequence 2: Turn back and walk to board
    setTimeout(() => {
        dinoWrap.querySelector('use').setAttribute('href', '#dino-back');
        dinoWrap.classList.add('walking-z');
        // task scroll disappears into "pockets"
        taskScroll.style.opacity = '0';
        taskScroll.style.transform = 'scale(0)';
        
        // Walk deep into board
        const listContainer = document.getElementById('main-tasks-container');
        const listRect = listContainer.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const listX = listRect.left - canvasRect.left;
        const listY = canvasRect.bottom - listRect.top - 80;

        dinoWrap.style.left = `${listX + 60}px`;
        dinoWrap.style.bottom = `${listY - 40}px`;
        dinoWrap.style.transform = 'scale(0.7)';
    }, 2500);

    // Sequence 3: Pull out hammer & hit
    const firstTask = document.querySelector('#main-tasks-container .task-item-row');
    if (firstTask) firstTask.style.opacity = '0';

    setTimeout(() => {
        dinoWrap.classList.remove('walking-z');
        dinoWrap.querySelector('use').setAttribute('href', '#dino-back-hammer');
        
        // Trigger hammer swing
        dinoWrap.querySelector('svg').classList.add('anim-hammering');
        
        // Bounce the first task on impact
        setTimeout(() => {
            if (firstTask) {
                firstTask.style.opacity = '1';
                firstTask.animate([
                    { transform: 'scale(0.8)', opacity: 0 },
                    { transform: 'scale(1.05)', opacity: 1 },
                    { transform: 'scale(1)', opacity: 1 }
                ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
            }
        }, 200); // sync with hammer strike
    }, 4000);

    // Sequence 4: Turn side and run away
    setTimeout(() => {
        dinoWrap.querySelector('svg').classList.remove('anim-hammering');
        dinoWrap.querySelector('use').setAttribute('href', '#dino-side');
        dinoWrap.classList.add('walking'); // 2D walk
        dinoWrap.style.left = '-150px'; // run off screen
    }, 4800);

    // Clean up
    setTimeout(() => {
        dinoWrap.remove();
        taskScroll.remove();
        onFinish();
    }, 6300);
}

function animateCompleteTask(taskId, onFinish) {
    const canvas = document.getElementById('tasks-anim-canvas');
    const taskEl = document.querySelector(`.task-item-row[data-id="${taskId}"]`);
    
    if (!canvas || !taskEl) {
        onFinish();
        return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    const elRect = taskEl.getBoundingClientRect();
    const taskX = elRect.left - canvasRect.left;
    const taskY = canvasRect.bottom - elRect.top - 80;

    const binChest = document.createElement('div');
    binChest.className = 'anim-bin-chest';
    binChest.innerText = '📦 DONE';
    canvas.appendChild(binChest);
    
    setTimeout(() => binChest.classList.add('active'), 50);

    // Create side-scrolling Dino
    const dinoWrap = document.createElement('div');
    dinoWrap.className = 'anim-dino-wrapper walking';
    dinoWrap.innerHTML = `
        <svg class="anim-dino-svg" viewBox="0 0 100 100">
            <use href="#dino-side"/>
        </svg>
    `;
    
    dinoWrap.style.left = '-150px';
    dinoWrap.style.bottom = `${taskY}px`;
    canvas.appendChild(dinoWrap);
    
    dinoWrap.offsetWidth;

    setTimeout(() => {
        dinoWrap.style.left = `${taskX - 10}px`;
    }, 50);

    let taskScroll;
    
    setTimeout(() => {
        dinoWrap.classList.remove('walking');
        taskEl.classList.add('completed');
        
        taskScroll = document.createElement('div');
        taskScroll.className = 'anim-task-scroll';
        taskScroll.innerText = taskEl.querySelector('.task-text').innerText;
        taskScroll.style.left = `${taskX + 30}px`;
        taskScroll.style.bottom = `${taskY + 65}px`;
        canvas.appendChild(taskScroll);

        taskEl.style.opacity = '0.2';
        
        // Dino picks up task, arms go up
        dinoWrap.classList.add('carrying');
    }, 1550);

    setTimeout(() => {
        dinoWrap.classList.add('walking');
        const binX = binChest.offsetLeft;
        const binY = canvasRect.bottom - binChest.getBoundingClientRect().top - 80;
        
        dinoWrap.style.left = `${binX - 70}px`;
        dinoWrap.style.bottom = `${binY}px`;
        
        taskScroll.style.left = `${binX - 40}px`;
        taskScroll.style.bottom = `${binY + 65}px`;
    }, 2000);

    setTimeout(() => {
        dinoWrap.classList.remove('walking');
        dinoWrap.classList.remove('carrying'); // Arms go down to throw
        const binX = binChest.offsetLeft;
        const binY = canvasRect.bottom - binChest.getBoundingClientRect().top - 80;

        taskScroll.style.left = `${binX + 20}px`;
        taskScroll.style.bottom = `${binY + 20}px`;
        taskScroll.style.transform = 'scale(0.1) rotate(180deg)';
        taskScroll.style.opacity = '0';
        
        binChest.classList.add('shake');
        createLocalConfetti(binX + 40, canvasRect.bottom - binY - 40, canvas);
    }, 3600);

    setTimeout(() => {
        dinoWrap.classList.add('walking');
        dinoWrap.style.left = '-150px';
        binChest.classList.remove('active');
    }, 4200);

    setTimeout(() => {
        dinoWrap.remove();
        if (taskScroll) taskScroll.remove();
        binChest.remove();
        taskEl.style.opacity = '1';
        onFinish();
    }, 5800);
}

function createLocalConfetti(x, y, parent) {
    const colors = ['#6B68FC', '#FF7B54', '#54B4FF', '#60D394', '#FFC03D'];
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = `${Math.random() * 8 + 4}px`;
        dot.style.height = `${Math.random() * 8 + 4}px`;
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.zIndex = '110';
        
        parent.appendChild(dot);
        
        // Animate explosion
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 40;
        const targetX = x + Math.cos(angle) * velocity;
        const targetY = y + Math.sin(angle) * velocity + 60; // gravity curve
        
        dot.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${targetX - x}px, ${targetY - y}px)`, opacity: 0 }
        ], {
            duration: 900,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
            fill: 'forwards'
        });
        
        setTimeout(() => dot.remove(), 950);
    }
}
