import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";

export class EmailAction implements IAction{
    async execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        const {smtpHost, stmpPort, smtpUser, smtpPass} = credentials;
        const {to, subject, body, isHtml} = metadata;

        if (!to || !subject || !body){
            return {
                success: false,
                error: 'Missing required fields'
            };
        }
        const finalSubject = this.interpolate(subject, inputData);
        const finalBody = this.interpolate(body, inputData);
        try{
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${credentials.apiKey}`
                },
                body: JSON.stringify({
                    to,
                    from: credentials.fromEmail || "Aayush <aayush@sol.com>",
                    subject: finalSubject,
                    html: isHtml ? finalBody : undefined,
                    text: !isHtml ? finalBody : undefined
                }),
            });
            const data = await response.json() as { message?: string; [key: string]: unknown };
            if (!response.ok){
                return {
                    success: false,
                    error: data?.message || "Failed to send email"
                }
            }
            return {
                success: true,
                data
            }
        }catch(e){
            return {
                success: false,
                error: e instanceof Error ? e.message : "Failed to send email"
            }
        }
    }
    private interpolate(template: string, data?: Record<string, any>): string{
        if (!data){
            return template;
        }
        return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] ?? `{{${key}}}`);
    }
}