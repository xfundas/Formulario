"use client"

import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function FormularioFacturacion() {
  const [formData, setFormData] = useState({
    rfc: "",
    nombreRazonSocial: "",
    regimenFiscal: "",
    codigoPostal: "",
    correo: "",
    telefono: "",
    usoCfdi: "",
    fechaCompra: "",
    formaPago: "",
    numeroTransaccion: "",
    montoTotal: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar al cargar
    checkIfMobile()

    // Verificar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkIfMobile)

    // Limpiar el event listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que todos los campos requeridos estén completos
    if (
      !formData.rfc ||
      !formData.nombreRazonSocial ||
      !formData.regimenFiscal ||
      !formData.codigoPostal ||
      !formData.correo ||
      !formData.usoCfdi ||
      !formData.fechaCompra ||
      !formData.formaPago ||
      !formData.montoTotal ||
      !formData.telefono ||
      !formDat
