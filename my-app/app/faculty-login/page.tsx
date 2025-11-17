import LoginForm from "../../components/LoginForm"

export const metadata = {
  title: "Faculty Login",
}

export default function FacultyLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <LoginForm role="Faculty" />
    </main>
  )
}
