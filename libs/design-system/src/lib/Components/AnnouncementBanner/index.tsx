export function AnnouncementBanner({ children }) {
  return (
    <div className="flex justify-center bg-gradient-to-r from-primary-green to-[#00feff] p-2">
      {children}
    </div>
  );
}
