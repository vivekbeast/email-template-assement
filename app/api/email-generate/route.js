import { HuggingFaceInference } from "@langchain/community/llms/hf";

export async function POST(req) {
    try {
        const { recipientName, emailType, keyPoints } = await req.json();

        if (!recipientName || !emailType || !keyPoints) {
            return new Response(JSON.stringify({ success: false, error: "Missing required fields." }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }

        const model = new HuggingFaceInference({
            model: "gpt2",
            apiKey: process.env.HUGGINGFACE_API_KEY,
            temperature: 0.8,
            maxTokens: 350,
        });

        const prompt = `
Write a professional email using the following details:

1. **Recipient Name**: ${recipientName}
2. **Email Purpose**: ${emailType} (e.g., "Meeting Request", "Follow Up", "Thank You")
3. **Key Points**: ${keyPoints}

Create an email with:
- A subject line matching the purpose.
- A polite greeting using the recipient's name.
- Clear explanation of the purpose, integrating the key points.
- Closing sentence expressing gratitude or follow-up request.
- A professional tone, clear and concise structure.

Example:
**Subject**: Related to ${emailType}

**Dear ${recipientName},**

I hope you're doing well. I am writing to schedule a meeting to discuss the upcoming project timeline and deliverables. We have some new insights to share and would appreciate your feedback before proceeding with the next phase.

Would you be available for a 30-minute meeting next week? I am open on Monday and Wednesday afternoons, but please let me know if another time would work better for you.

Looking forward to your response.

Thank you for your time.

**Best regards,**  
[Your Name]   
[Your Position]  
[Your Contact Information]
        `;

        const response = await model.invoke(prompt);

        return new Response(
            JSON.stringify({ success: true, email: response }),
            { headers: { "Content-Type": "application/json" }, status: 200 }
        );
    } catch (error) {
        console.error("Error generating email:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { "Content-Type": "application/json" }, status: 500 }
        );
    }
}


