import "@/styles/globals.css"
import "@/styles/layout.css"
import "@/styles/discussion.css"
import "@/styles/article.css"
import "@/styles/member.css"
import "@/styles/campSite-CSS/Card.css"
import { AuthContextProvide } from "@/context/AuthContext"
// import "bootstrap/dist/css/bootstrap.min.css"

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <AuthContextProvide>
      <Component {...pageProps} />
    </AuthContextProvide>
  )
}
