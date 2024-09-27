'use client'

import { useState } from 'react'
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PasswordCreation() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' })

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'Pelo menos 8 caracteres' },
    { regex: /[A-Z]/, text: 'Uma letra maiúscula' },
    { regex: /[a-z]/, text: 'Uma letra minúscula' },
    { regex: /[0-9]/, text: 'Um número' },
    { regex: /[^A-Za-z0-9]/, text: 'Um caractere especial' },
  ]

  const validatePassword = (value: string) => {
    let strength = 0
    passwordRequirements.forEach(requirement => {
      if (requirement.regex.test(value)) {
        strength++
      }
    })
    setPasswordStrength(strength)

    if (value.length === 0) {
      setErrors(prev => ({ ...prev, password: 'A senha é obrigatória' }))
    } else if (strength < passwordRequirements.length) {
      setErrors(prev => ({ ...prev, password: 'A senha não atende a todos os requisitos' }))
    } else {
      setErrors(prev => ({ ...prev, password: '' }))
    }
  }

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }))
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword && passwordStrength === passwordRequirements.length) {
      alert('Senha criada com sucesso!')
      // Here you would typically send the password to your backend
    } else {
      alert('Por favor, corrija os erros antes de enviar.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img src="/placeholder.svg?height=50&width=200" alt="AmplifyUs Logo" className="h-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Criar Senha</CardTitle>
          <CardDescription className="text-center">
            Pagamento bem-sucedido! Crie sua senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    validatePassword(e.target.value)
                  }}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    validateConfirmPassword(e.target.value)
                  }}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Força da Senha:</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    passwordStrength === 5 ? 'bg-green-500' :
                    passwordStrength >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Requisitos da Senha:</p>
              <ul className="space-y-1">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className="flex items-center text-sm">
                    {req.regex.test(password) ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    {req.text}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Criar Senha</Button>
            <div className="text-center text-sm text-gray-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="inline h-4 w-4 mr-1" />
                    Dica de segurança
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use uma senha única para cada conta e considere usar um gerenciador de senhas.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-center text-sm text-gray-500">
              <a href="#" className="hover:underline">Política de Privacidade</a>
              {' | '}
              <a href="#" className="hover:underline">Suporte</a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}