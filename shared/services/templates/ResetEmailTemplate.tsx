interface ResetEmailTemplateProps {
  link: string;
}

export const ResetEmailTemplate = ({ link }: ResetEmailTemplateProps) => (
  <div>
    <p className="text-base">You requested a password reset.</p>
    <p className="text-base">Click the link below to create a new password:</p>
    <span>{link}</span>
    <p className="text-base">
      If you did not request this, you can ignore this email.
    </p>
  </div>
);

export default ResetEmailTemplate;
