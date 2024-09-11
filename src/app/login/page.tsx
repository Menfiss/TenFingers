
import { login, signup, signout } from "../../../server-actions/login-actions/actions"

export default function LoginPage() {
    return (
      <div>
        <form>
          <label htmlFor="nickname">Nickname:</label>
          <input id="nickname" name="nickname" type="text" required />
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </form>

        <form>
          <button formAction={signout}>Sign out</button>
        </form>
      </div>
    )
  }