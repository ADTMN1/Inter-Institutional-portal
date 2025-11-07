export const NotificationService = {
  async notifyInstitutionApproval(
    institutionId: string,
    institutionName: string,
    approved: boolean
  ) {
    const status = approved ? "approved" : "rejected";
    console.log(
      `📢 [Server] Institution "${institutionName}" (${institutionId}) has been ${status}.`
    );
    return Promise.resolve({ success: true });
  },
};
