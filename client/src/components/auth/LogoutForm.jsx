import { compose, withApollo } from "react-apollo"
import withRouter from "react-router/withRouter"
import { config } from "../../config"

const LogoutForm = ({ client, history }) => {
  localStorage.removeItem(config.TOKEN_NAME)
  client.resetStore()
  history.push("/login")
  return ""
}

export default compose(withRouter, withApollo)(LogoutForm)
