public interface IUserSession
{
    int BranchId { get; }
    int ClientId { get; }
    long UserId { get; }
    long GetUserId();
    bool IsSuperAdmin();
    bool HasUserRol { get; }
    bool HasSuperAdminRol { get; }
    bool HasAdminRol { get; }
    string Url { get; }

    string UserRol { get; }
}