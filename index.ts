import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
    apiKey: Bun.env.TYPESAFE_API_KEY
});

const decision = await openrouter.alpha.decisions.create({
    decisionsRequest: {
        model: "typesafe/jev-1.13",
        state: "Help! My payouts have been failing for 3 days.",
        questions: {
            is_urgent: {
                type: "noul",
                instructions: "Does this message convey urgency?",
                criteria: {
                    true: "Explicitly time-sensitive",
                    false: "No urgency expressed"
                }
            },
            department: {
                type: "choice",
                instructions: "Which team should handle this?",
                criteria: {
                    billing: "Payments, invoicing, refunds",
                    technical: "Bugs, outages, integrations",
                    sales: "Pricing, upgrades, new accounts"
                }
            },
            frustration: {
                type: "score",
                instructions: "How frustrated is the customer?",
                criteria: ["Calm", "Frustrated", "Very angry"]
            }
        }
    }
});

const { is_urgent, department, frustration } = decision.answers;
if (is_urgent.type === "noul" && department.type === "choice" && frustration.type === "score") {
    console.log(is_urgent.noul, department.choice, frustration.score);
}