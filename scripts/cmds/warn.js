const { getTime } = global.utils;

const KICK_LIMIT = 2; // warning limit to kick user

module.exports = { config: { name: "warn", version: "1.10", author: "NTKhang (Modified by Azad)", countDown: 5, role: 0, description: { vi: "cảnh cáo thành viên trong nhóm, đủ 2 lần ban khỏi box", en: "warn member in group, if they have 2 warns, they will be banned" }, category: "box chat", guide: { vi: "   {pn} @tag <lý do>: dùng cảnh cáo thành viên" + "\n   {pn} list: xem danh sách những thành viên đã bị cảnh cáo" + "\n   {pn} listban: xem danh sách những thành viên đã bị cảnh cáo đủ 2 lần và bị ban khỏi box" + "\n   {pn} info [@tag | <uid> | reply | để trống]: xem thông tin cảnh cáo" + "\n   {pn} unban [@tag | <uid> | reply | để trống]: gỡ ban thành viên" + "\n   {pn} unwarn [@tag | <uid> | reply | để trống] [<số thứ tự> | để trống]: gỡ cảnh cáo", en: "   {pn} @tag <reason>: warn member" + "\n   {pn} list: view list of warned members" + "\n   {pn} listban: view list of banned members" + "\n   {pn} info [@tag | <uid> | reply | leave blank]: view warning info" + "\n   {pn} unban [@tag | <uid> | reply | leave blank]: unban member" + "\n   {pn} unwarn [@tag | <uid> | reply | leave blank] [<number> | leave blank]: remove warning" } },

langs: {
    vi: {
        list: "📋 *DANH SÁCH WARNED MEMBERS*\n%1",
        listBan: "⛔ *DANH SÁCH BANNED MEMBERS*\n%1",
        listEmpty: "🟢 Nhóm bạn chưa có thành viên nào bị cảnh cáo",
        listBanEmpty: "🟢 Nhóm bạn chưa có thành viên nào bị ban",
        invalidUid: "⚠️ Vui lòng nhập uid hợp lệ",
        noData: "⚠️ Không có dữ liệu",
        noPermission: "❌ Chỉ admin nhóm mới có thể unban",
        unbanSuccess: "✅ *UNBAN SUCCESSFUL*\n👤 [%1 | %2] đã có thể tham gia lại box chat",
        unwarnSuccess: "✅ *UNWARN SUCCESSFUL*\n👤 [%2 | %3] đã được gỡ cảnh cáo lần %1",
        resetWarnSuccess: "✅ *RESET WARN DATA SUCCESSFUL*",
        warnSuccess: "⚠️ *WARNING ISSUED*\n👤 %1\n🆔 UID: %3\n📌 Lý do: %4\n⏰ Date: %5\n📊 Lần cảnh cáo: %2/2\n⛔ Thành viên bị ban khỏi box, gỡ ban với: \"%6warn unban %3\"",
        warnSuccess2: "⚠️ *WARNING ISSUED*\n👤 %1\n🆔 UID: %3\n📌 Lý do: %4\n⏰ Date: %5\n📊 Lần cảnh cáo: %2/2",
        hasBanned: "⛔ Những thành viên đã bị ban do 2 cảnh cáo trước đó:\n%1",
        failedKick: "⚠️ Lỗi khi kick thành viên:\n%1",
        userNotInGroup: "⚠️ Người dùng \"%1\" hiện không có trong nhóm"
    },
    en: {
        list: "📋 *WARNED MEMBERS LIST*\n%1",
        listBan: "⛔ *BANNED MEMBERS LIST*\n%1",
        listEmpty: "🟢 Your group has no warned members",
        listBanEmpty: "🟢 Your group has no banned members",
        invalidUid: "⚠️ Please enter a valid uid",
        noData: "⚠️ No data",
        noPermission: "❌ Only group admins can unban members",
        unbanSuccess: "✅ *UNBAN SUCCESSFUL*\n👤 [%1 | %2] can now join the chat box",
        unwarnSuccess: "✅ *UNWARN SUCCESSFUL*\n👤 [%2 | %3] warning #%1 removed",
        resetWarnSuccess: "✅ *RESET WARN DATA SUCCESSFUL*",
        warnSuccess: "⚠️ *WARNING ISSUED*\n👤 %1\n🆔 UID: %3\n📌 Reason: %4\n⏰ Date: %5\n📊 Warnings: %2/2\n⛔ User banned! To unban use: \"%6warn unban %3\"",
        warnSuccess2: "⚠️ *WARNING ISSUED*\n👤 %1\n🆔 UID: %3\n📌 Reason: %4\n⏰ Date: %5\n📊 Warnings: %2/2",
        hasBanned: "⛔ Members previously banned due to 2 warnings:\n%1",
        failedKick: "⚠️ Error kicking members:\n%1",
        userNotInGroup: "⚠️ User \"%1\" is not currently in your group"
    }
}

};
