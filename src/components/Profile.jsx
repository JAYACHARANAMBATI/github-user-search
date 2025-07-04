export default function Profile({ data }) {
  return (
    <div className="profile">
      <img src={data.avatar_url} alt="Avatar" />
      <div>
        <h2>{data.name || data.login}</h2>
        <p>{data.bio}</p>
        <p>📍 {data.location || 'Unknown'}</p>
        <p>Followers: {data.followers} | Following: {data.following}</p>
      </div>
    </div>
  );
}
