// Cerebras Cloud API Configuration
const CEREBRAS_API_KEY = 'csk-yjyj2m4xcvmyvkf8v3x5kd6te66ecjjcd54hk9n8npcprmh2';
const API_BASE_URL = 'https://api.cerebras.ai/v1/chat/completions';

// Chat state
let chatHistory = [];
let isLoading = false;

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const modelSelect = document.getElementById('model-select');
const rateLimitInfo = document.getElementById('rate-limit-info');

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    // Handle Enter key for sending messages
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Handle model selection change
    modelSelect.addEventListener('change', function() {
        const selectedModel = this.value;
        addMessage('system', `Switched to model: ${getModelDisplayName(selectedModel)}`);
    });
});

// Send message function
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || isLoading) return;

    // Add user message to chat
    addMessage('user', message);
    chatInput.value = '';
    
    // Show loading state
    setLoading(true);
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Add AI response to chat
        addMessage('ai', response);
        
        // Update rate limit info if available
        updateRateLimitInfo();
        
    } catch (error) {
        console.error('Error getting AI response:', error);
        addMessage('ai', `Error: ${error.message}`);
        
        // Handle specific error cases
        if (error.message.includes('429')) {
            showRateLimitError(error);
        } else if (error.message.includes('401')) {
            addMessage('ai', 'Error: Invalid API key. Please check your configuration.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            addMessage('ai', 'Error: Network error. Please check your internet connection.');
        }
    } finally {
        setLoading(false);
    }
}

// Get AI response from Cerebras API
async function getAIResponse(message) {
    const selectedModel = modelSelect.value;
    
    // Prepare messages for API (include chat history for context)
    const messages = [
        ...chatHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: message }
    ];

    const requestBody = {
        model: selectedModel,
        messages: messages,
        temperature: 0.7,
        max_completion_tokens: -1, // No limit
        stream: false,
        seed: 0,
        top_p: 1
    };

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CEREBRAS_API_KEY}`
        },
        body: JSON.stringify(requestBody)
    });

    // Check if response is ok
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
            const resetTime = response.headers.get('x-ratelimit-reset-requests-day');
            const remaining = response.headers.get('x-ratelimit-remaining-requests-day');
            throw new Error(`Rate limit exceeded. Requests remaining: ${remaining}. Reset in: ${resetTime} seconds.`);
        } else if (response.status === 401) {
            throw new Error('Authentication failed. Please check your API key.');
        } else if (response.status === 400) {
            throw new Error(`Bad request: ${errorData.error?.message || 'Invalid request format'}`);
        } else {
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
    }

    const data = await response.json();
    
    // Update chat history
    chatHistory.push({ role: 'user', content: message });
    chatHistory.push({ role: 'assistant', content: data.choices[0].message.content });
    
    return data.choices[0].message.content;
}

// Add message to chat display
function addMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const senderDiv = document.createElement('div');
    senderDiv.className = 'message-sender';
    senderDiv.textContent = sender === 'user' ? 'You' : 'AI Assistant';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Set loading state
function setLoading(loading) {
    isLoading = loading;
    sendButton.disabled = loading;
    chatInput.disabled = loading;
    
    if (loading) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.id = 'loading-message';
        loadingDiv.textContent = 'AI is thinking...';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }
}

// Clear chat function
function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        chatHistory = [];
        chatMessages.innerHTML = `
            <div class="message ai-message">
                <div class="message-sender">AI Assistant</div>
                <div class="message-content">Chat cleared! How can I help you today?</div>
            </div>
        `;
        
        // Hide rate limit info
        rateLimitInfo.style.display = 'none';
    }
}

// Update rate limit information
function updateRateLimitInfo() {
    // This would be populated from API response headers
    // For now, we'll show a generic message
    rateLimitInfo.style.display = 'block';
    rateLimitInfo.innerHTML = `
        <strong>Rate Limit Info:</strong> 
        Free tier allows 30 requests/minute and 60K tokens/minute. 
        Monitor your usage to avoid hitting limits.
    `;
}

// Show rate limit specific error
function showRateLimitError(error) {
    addMessage('ai', `⚠️ Rate Limit Warning: ${error.message}`);
    rateLimitInfo.style.display = 'block';
    rateLimitInfo.innerHTML = `
        <strong>Rate Limit Exceeded:</strong> You've reached the free tier limit. 
        Please wait before sending more messages, or consider upgrading to the Developer tier for higher limits.
    `;
}

// Get model display name
function getModelDisplayName(modelValue) {
    const modelNames = {
        'gpt-oss-120b': 'GPT-OSS-120B',
        'llama3.1-8b': 'Llama 3.1 8B',
        'llama-3.3-70b': 'Llama 3.3 70B',
        'qwen-3-32b': 'Qwen 3 32B',
        'qwen-3-235b-a22b-instruct-2507': 'Qwen 3 235B Instruct',
        'qwen-3-235b-a22b-thinking-2507': 'Qwen 3 235B Thinking',
        'zai-glm-4.6': 'Zai GLM 4.6'
    };
    return modelNames[modelValue] || modelValue;
}

// Auto-resize textarea
chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// Handle connection errors
window.addEventListener('offline', function() {
    addMessage('ai', '⚠️ You are offline. Please check your internet connection.');
});

window.addEventListener('online', function() {
    addMessage('ai', '✅ You are back online! You can continue chatting.');
});

// Add some example prompts
function addExamplePrompts() {
    const examples = [
        "What can you help me with?",
        "Explain quantum computing in simple terms",
        "Write a short story about a robot",
        "Help me with a coding problem"
    ];
    
    // This could be expanded to show example prompts to users
}

// Export functions for global access
window.sendMessage = sendMessage;
window.clearChat = clearChat;
