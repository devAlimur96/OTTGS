import LoginForm from "../../components/LoginForm"

export const metadata = {
  title: "Student Login",
}

export default function StudentLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <LoginForm role="Student" />
    </main>
  )
}
