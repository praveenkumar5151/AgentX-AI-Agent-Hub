import { GoogleGenAI, Type } from "@google/genai";
import { CalendarEvent, GitHubIssue, DisasterAlert } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Mental Health Scheduler Service ---

const eventSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A short, encouraging title for the event." },
        description: { type: Type.STRING, description: "A brief, one-sentence description of the activity." },
        startTime: { type: Type.STRING, description: "The suggested start time in 'Day, H:MM AM/PM' format." },
        endTime: { type: Type.STRING, description: "The suggested end time in 'Day, H:MM AM/PM' format." },
        type: { type: Type.STRING, enum: ['mindfulness', 'focus', 'break', 'exercise'] },
    },
    required: ["title", "description", "startTime", "endTime", "type"]
};

export const findWellnessBreaks = async (schedule: string): Promise<CalendarEvent[]> => {
    const prompt = `You are an AI assistant for busy college students. Based on the user's schedule: "${schedule}", find 4 distinct, realistically-timed slots for mental health or focus breaks. The breaks should be 15-45 minutes. Create a mix of 'mindfulness', 'focus', 'break', and 'exercise' events. Assume the week starts on Monday. Return a JSON array of objects.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', contents: prompt,
            config: { responseMimeType: 'application/json', responseSchema: { type: Type.ARRAY, items: eventSchema } }
        });
        return JSON.parse(response.text.trim()) as CalendarEvent[];
    } catch (error) {
        console.error("Gemini API Error (Wellness):", error);
        throw new Error("Failed to fetch schedule from the AI model.");
    }
};

// --- Civic Engagement Assistant Service ---

const issueSchema = {
    type: Type.OBJECT,
    properties: {
        repository: { type: Type.STRING, description: "The full repository name, e.g., 'owner/repo'." },
        title: { type: Type.STRING, description: "The title of the GitHub issue." },
        url: { type: Type.STRING, description: "The full URL to the GitHub issue." },
        number: { type: Type.INTEGER, description: "The issue number." },
        labels: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of relevant labels." },
    },
    required: ["repository", "title", "url", "number", "labels"]
};

export const findGitHubIssues = async (interests: string): Promise<GitHubIssue[]> => {
    const prompt = `You are an AI assistant helping new developers contribute to open source. Based on the user's interests: "${interests}", find 4 beginner-friendly GitHub issues. Prioritize issues with labels like 'good first issue', 'help wanted', or 'documentation'. Provide the full repository name and URL. Return a JSON array of objects.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', contents: prompt,
            config: { responseMimeType: 'application/json', responseSchema: { type: Type.ARRAY, items: issueSchema } }
        });
        return JSON.parse(response.text.trim()) as GitHubIssue[];
    } catch (error) {
        console.error("Gemini API Error (GitHub):", error);
        throw new Error("Failed to fetch issues from the AI model.");
    }
};

// --- Disaster Alert Bot Service ---

const alertSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The title of the alert, e.g., 'Tornado Warning'." },
        location: { type: Type.STRING, description: "The specific area or county affected." },
        severity: { type: Type.STRING, enum: ['Advisory', 'Watch', 'Warning'], description: "The severity level of the alert."},
        description: { type: Type.STRING, description: "A brief summary of the alert and recommended actions." },
        source: { type: Type.STRING, description: "The official source of the alert, e.g., 'National Weather Service'." },
    },
    required: ["title", "location", "severity", "description", "source"]
};

export const getDisasterAlerts = async (location: string): Promise<DisasterAlert[]> => {
    const prompt = `You are an AI disaster alert system. Find up to 4 active, severe weather or disaster alerts for the following location: "${location}". If there are no active alerts, return an empty array. Focus on official, recent alerts. Return a JSON array of objects.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', contents: prompt,
            config: { responseMimeType: 'application/json', responseSchema: { type: Type.ARRAY, items: alertSchema } }
        });
        return JSON.parse(response.text.trim()) as DisasterAlert[];
    } catch (error) {
        console.error("Gemini API Error (Alerts):", error);
        throw new Error("Failed to fetch alerts from the AI model.");
    }
};