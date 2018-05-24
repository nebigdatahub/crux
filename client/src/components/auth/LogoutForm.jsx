import { compose, withApollo } from "react-apollo"
import withRouter from "react-router/withRouter"
import { FIGSHARE_TOKEN, TOKEN_NAME } from "../../config"

const LogoutForm = ({ client, history }) => {
  localStorage.removeItem(TOKEN_NAME)
  localStorage.removeItem(FIGSHARE_TOKEN)
  localStorage.removeItem("username")
  client.resetStore()
  history.push("/login")
  return ""
}

export default compose(withRouter, withApollo)(LogoutForm)
