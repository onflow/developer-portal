export const Foobar = ({ message }: { message?: string }) => (
  <div className="bg-red-500">foobar {message ? message : `no message`}</div>
);
