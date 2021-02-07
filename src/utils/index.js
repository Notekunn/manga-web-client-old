const permissionLevel = {//cang be cang co quyen
  admin: 0,
  moderator: 1,
  translator: 2,
  member: 3
}
export const isAuthority = function (user, permission) {
  const tLevel = permissionLevel[user.permission] || 100,
    needLevel = permissionLevel[permission] || 100;
  if (!tLevel || !needLevel) return false;
  return tLevel <= needLevel;
}
