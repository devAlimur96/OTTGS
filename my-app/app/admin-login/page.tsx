import LoginForm from "../../components/LoginForm"

export const metadata = {
  title: "Admin Login",
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <LoginForm role="Admin" />
    </main>
  )
}
