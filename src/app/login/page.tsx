
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth, AuthProvider } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

function LoginPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Usado internamente para la cédula
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.toLowerCase().endsWith('@banescoseguros.com')) {
      toast({
        title: "Correo no válido",
        description: "Por favor, utilice un correo con el dominio @banescoseguros.com",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      toast({ title: "Inicio de sesión exitoso", description: "Bienvenido de nuevo." });
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[280px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-light tracking-tighter">
              Iniciar Sesión
            </h1>
            <p className="text-[10px] text-muted-foreground font-light tracking-tight">
              Introduce tu correo y cédula para acceder al portal.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-[10px] font-light uppercase tracking-tight">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@banescoseguros.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-8 text-xs font-light tracking-tight focus-visible:ring-1"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-[10px] font-light uppercase tracking-tight">Cedula</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="Número de cédula"
                className="h-8 text-xs font-light tracking-tight focus-visible:ring-1"
              />
            </div>
            <Button type="submit" className="w-full h-8 text-xs font-light tracking-tight mt-2" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/PORTADA%20ENTORNO%20SEG.jpg?raw=true"
          alt="Banner corporativo de Banesco Seguros"
          fill
          className="h-full w-full object-cover dark:brightness-[0.3]"
          data-ai-hint="corporate banner"
          priority
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginPageContent />
        </AuthProvider>
    )
}
