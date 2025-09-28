import { useRouter } from 'next/router';
export default function Login() {
  const router = useRouter();
  return (
    <main style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'system-ui'}}>
      <h1>Protected page — enter password</h1>
      <form method="post" action="/api/login" style={{display:'flex',flexDirection:'column',gap:8, width: '300px'}}>
        <input name="password" type="password" placeholder="Password" required style={{padding:8,fontSize:16}} />
        <button type="submit" style={{padding:8,fontSize:16}}>Enter</button>
      </form>
      {router.query.error === '1' && <p style={{color:'red'}}>Wrong password — try again.</p>}
    </main>
  );
}
