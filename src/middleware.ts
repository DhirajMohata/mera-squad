export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/profile", "/team/manage", "/team/my-team"]
}
