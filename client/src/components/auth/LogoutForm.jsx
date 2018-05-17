import { compose, withApollo } from "react-apollo"
import withRouter from "react-router/withRouter"
import { TOKEN_NAME } from "../../config"

const LogoutForm = ({ client, history }) => {
  localStorage.removeItem(TOKEN_NAME)
  client.resetStore()
  history.push("/login")
  return ""
}

export default compose(withRouter, withApollo)(LogoutForm)
