import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import ImgBackground from "../../../assets/adminImage.jpg";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useForm } from "react-hook-form";

// Solo para testing local
localStorage.setItem(
  "admin",
  JSON.stringify({
    email: "admin@factoryflow.com",
    password: "123456",
  })
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const ok = await login(data.email, data.password);

    if (!ok) {
      alert("Credenciales incorrectas");
      return;
    }

    navigate("/");
  };

  return (
    <main className="h-screen w-full flex items-center justify-center p-4">
      <div className="bg-[#011627]/40 rounded-lg p-8 w-full max-w-sm flex flex-col items-center">
        
        {/* Imagen */}
        <img
          src={ImgBackground}
          alt="Admin Background"
          className="w-56 h-32 object-cover rounded-4xl mb-6"
        />

        <h1 className="text-4xl font-bold text-center mb-4">FactoryFlow</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Ingresá tu email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Ingresá tu contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="button"
              className="absolute right-3 top-[30px]"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <Button className="bg-[#01335D] text-white rounded-full text-lg py-5 hover:bg-[#02509E] transition-all">
            Iniciar sesión
          </Button>
        </form>

        <div className="flex items-center justify-between w-full mt-4 text-sm">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Recordarme</Label>
          </div>
        </div>
      </div>
    </main>
  );
}
