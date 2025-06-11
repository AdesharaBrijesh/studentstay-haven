
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ListingNotificationRequest {
  propertyName: string;
  propertyId: string;
  submittedBy: string;
  adminEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { propertyName, propertyId, submittedBy, adminEmail }: ListingNotificationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "StudentStay <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Property Listing: ${propertyName}`,
      html: `
        <h1>New Property Listing Submitted</h1>
        <p>A new property listing has been submitted and requires your review:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">${propertyName}</h2>
          <p><strong>Submitted by:</strong> ${submittedBy}</p>
          <p><strong>Property ID:</strong> ${propertyId}</p>
        </div>
        
        <p>Please log in to the admin panel to review and approve this listing.</p>
        
        <p>Best regards,<br>StudentStay Team</p>
      `,
    });

    console.log("Listing notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-listing-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
