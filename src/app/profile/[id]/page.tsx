const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page {params.id}</h1>
    </div>
  );
};

export default UserProfile;
