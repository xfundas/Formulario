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
      !formData.numeroTransaccion
    ) {
      setSubmitStatus({
        success: false,
        message: "Por favor complete todos los campos obligatorios.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({
          success: true,
          message:
            "¡Gracias! Hemos recibido tus datos para facturación. Te enviaremos la factura en un plazo no mayor a 48 horas.",
        })
        // Limpiar el formulario después de un envío exitoso
        setFormData({
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

        // Hacer scroll al inicio para mostrar el mensaje de éxito
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Hubo un error al enviar el formulario. Por favor intente nuevamente.",
        })
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setSubmitStatus({
        success: false,
        message: "Hubo un error al enviar el formulario. Por favor intente nuevamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-4 px-2 sm:px-4 md:py-8">
      <div className="w-full max-w-2xl">
        {/* Header con logo */}
        <div className="bg-black p-3 sm:p-4 flex justify-center rounded-t-lg">
          <Image
            src="/images/logo.png"
            alt="X Fundas SLP - Formulario de facturación"
            width={150}
            height={150}
            className="h-auto w-32 sm:w-40 md:w-48 lg:w-[150px]"
            priority
          />
        </div>

        <Card className="rounded-t-none shadow-lg">
          <CardHeader className="bg-white p-4 sm:p-6 border-b">
            <h1 className="text-xl sm:text-2xl font-bold text-center" id="form-title">
              DATOS PARA FACTURACIÓN (CFDI)
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2" id="form-description">
              * Indica campos obligatorios
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <form
              onSubmit={handleSubmit}
              className="text-sm sm:text-base"
              aria-labelledby="form-title"
              aria-describedby="form-description"
            >
              {/* RFC */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="rfc" className="text-sm sm:text-base font-medium flex items-center">
                  RFC <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="rfc"
                  name="rfc"
                  placeholder=""
                  value={formData.rfc}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Nombre/razón social */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="nombreRazonSocial" className="text-sm sm:text-base font-medium flex items-center">
                  Nombre/razón social <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="nombreRazonSocial"
                  name="nombreRazonSocial"
                  placeholder=""
                  value={formData.nombreRazonSocial}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Régimen fiscal */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="regimenFiscal" className="text-sm sm:text-base font-medium flex items-center">
                  Régimen fiscal <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("regimenFiscal", value)}
                  value={formData.regimenFiscal}
                >
                  <SelectTrigger className="mt-2 text-sm sm:text-base h-9 sm:h-10">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="text-sm sm:text-base max-h-[50vh] overflow-y-auto">
                    <SelectItem value="601">601 - General de Ley Personas Morales</SelectItem>
                    <SelectItem value="603">603 - Personas Morales con Fines no Lucrativos</SelectItem>
                    <SelectItem value="605">605 - Sueldos y Salarios e Ingresos Asimilados a Salarios</SelectItem>
                    <SelectItem value="606">606 - Arrendamiento</SelectItem>
                    <SelectItem value="608">608 - Demás ingresos</SelectItem>
                    <SelectItem value="609">609 - Consolidación</SelectItem>
                    <SelectItem value="610">
                      610 - Residentes en el Extranjero sin Establecimiento Permanente en México
                    </SelectItem>
                    <SelectItem value="612">
                      612 - Personas Físicas con Actividades Empresariales y Profesionales
                    </SelectItem>
                    <SelectItem value="614">614 - Ingresos por Dividendos (socios y accionistas)</SelectItem>
                    <SelectItem value="616">616 - Sin obligaciones fiscales</SelectItem>
                    <SelectItem value="620">
                      620 - Sociedades Cooperativas de Producción que optan por diferir sus ingresos
                    </SelectItem>
                    <SelectItem value="621">621 - Incorporación Fiscal</SelectItem>
                    <SelectItem value="622">622 - Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras</SelectItem>
                    <SelectItem value="623">623 - Opcional para Grupos de Sociedades</SelectItem>
                    <SelectItem value="624">624 - Coordinados</SelectItem>
                    <SelectItem value="625">
                      625 - Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas
                    </SelectItem>
                    <SelectItem value="626">626 - Régimen Simplificado de Confianza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Código postal */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="codigoPostal" className="text-sm sm:text-base font-medium flex items-center">
                  Código postal <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="codigoPostal"
                  name="codigoPostal"
                  placeholder=""
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Correo */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="correo" className="text-sm sm:text-base font-medium flex items-center">
                  Correo <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder=""
                  value={formData.correo}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Número telefónico o celular */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="telefono" className="text-sm sm:text-base font-medium flex items-center">
                  Número telefónico o celular <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder=""
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Fecha de compra */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="fechaCompra" className="text-sm sm:text-base font-medium flex items-center">
                  Fecha de compra <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="fechaCompra"
                  name="fechaCompra"
                  type="date"
                  value={formData.fechaCompra}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Forma de pago */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="formaPago" className="text-sm sm:text-base font-medium flex items-center">
                  Forma de pago <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("formaPago", value)} value={formData.formaPago}>
                  <SelectTrigger className="mt-2 text-sm sm:text-base h-9 sm:h-10">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="text-sm sm:text-base max-h-[50vh] overflow-y-auto">
                    <SelectItem value="01">01 - Efectivo</SelectItem>
                    <SelectItem value="02">02 - Cheque nominativo</SelectItem>
                    <SelectItem value="03">03 - Transferencia electrónica de fondos</SelectItem>
                    <SelectItem value="04">04 - Tarjeta de crédito</SelectItem>
                    <SelectItem value="05">05 - Monedero electrónico</SelectItem>
                    <SelectItem value="06">06 - Dinero electrónico</SelectItem>
                    <SelectItem value="08">08 - Vales de despensa</SelectItem>
                    <SelectItem value="12">12 - Dación en pago</SelectItem>
                    <SelectItem value="13">13 - Pago por subrogación</SelectItem>
                    <SelectItem value="14">14 - Pago por consignación</SelectItem>
                    <SelectItem value="15">15 - Condonación</SelectItem>
                    <SelectItem value="17">17 - Compensación</SelectItem>
                    <SelectItem value="23">23 - Novación</SelectItem>
                    <SelectItem value="24">24 - Confusión</SelectItem>
                    <SelectItem value="25">25 - Remisión de deuda</SelectItem>
                    <SelectItem value="26">26 - Prescripción o caducidad</SelectItem>
                    <SelectItem value="27">27 - A satisfacción del acreedor</SelectItem>
                    <SelectItem value="28">28 - Tarjeta de débito</SelectItem>
                    <SelectItem value="29">29 - Tarjeta de servicios</SelectItem>
                    <SelectItem value="30">30 - Aplicación de anticipos</SelectItem>
                    <SelectItem value="99">99 - Por definir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Número de transacción */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="numeroTransaccion" className="text-sm sm:text-base font-medium flex items-center">
                  Transaccion# <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="numeroTransaccion"
                  name="numeroTransaccion"
                  placeholder=""
                  value={formData.numeroTransaccion}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Monto total de compra */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="montoTotal" className="text-sm sm:text-base font-medium flex items-center">
                  Monto total de compra <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="montoTotal"
                  name="montoTotal"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder=""
                  value={formData.montoTotal}
                  onChange={handleChange}
                  className="mt-2 border-0 border-b rounded-none focus:ring-0 px-0 text-sm sm:text-base h-9 sm:h-10"
                  required
                />
              </div>

              {/* Uso de CFDI */}
              <div className="p-4 sm:p-6 border-b">
                <Label htmlFor="usoCfdi" className="text-sm sm:text-base font-medium flex items-center">
                  Uso de CFDI <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("usoCfdi", value)} value={formData.usoCfdi}>
                  <SelectTrigger className="mt-2 text-sm sm:text-base h-9 sm:h-10">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="text-sm sm:text-base max-h-[50vh] overflow-y-auto">
                    <SelectItem value="G01">G01 - Adquisición de mercancías</SelectItem>
                    <SelectItem value="G02">G02 - Devoluciones, descuentos o bonificaciones</SelectItem>
                    <SelectItem value="G03">G03 - Gastos en general</SelectItem>
                    <SelectItem value="I01">I01 - Construcciones</SelectItem>
                    <SelectItem value="I02">I02 - Mobiliario y equipo de oficina para inversiones</SelectItem>
                    <SelectItem value="I03">I03 - Equipo de transporte</SelectItem>
                    <SelectItem value="I04">I04 - Equipo de cómputo y accesorios</SelectItem>
                    <SelectItem value="I05">I05 - Dados, troqueles, moldes, matrices y herramental</SelectItem>
                    <SelectItem value="I06">I06 - Comunicaciones telefónicas</SelectItem>
                    <SelectItem value="I07">I07 - Comunicaciones satelitales</SelectItem>
                    <SelectItem value="I08">I08 - Otra maquinaria y equipo</SelectItem>
                    <SelectItem value="D01">D01 - Honorarios médicos, dentales y hospitalarios</SelectItem>
                    <SelectItem value="D02">D02 - Gastos médicos por incapacidad o discapacidad</SelectItem>
                    <SelectItem value="D03">D03 - Gastos funerales</SelectItem>
                    <SelectItem value="D04">D04 - Donativos</SelectItem>
                    <SelectItem value="D05">D05 - Intereses reales pagados por créditos hipotecarios</SelectItem>
                    <SelectItem value="D06">D06 - Aportaciones voluntarias al SAR</SelectItem>
                    <SelectItem value="D07">D07 - Primas de seguros de gastos médicos</SelectItem>
                    <SelectItem value="D08">D08 - Gastos de transportación escolar obligatoria</SelectItem>
                    <SelectItem value="D09">D09 - Depósitos en cuentas para el ahorro, primas de pensiones</SelectItem>
                    <SelectItem value="D10">D10 - Pagos por servicios educativos (colegiaturas)</SelectItem>
                    <SelectItem value="S01">S01 - Sin efectos fiscales</SelectItem>
                    <SelectItem value="CP01">CP01 - Pagos</SelectItem>
                    <SelectItem value="CN01">CN01 - Nómina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mensaje de estado */}
              {submitStatus.message && (
                <div
                  className={`mx-4 sm:mx-6 mt-4 sm:mt-6 p-3 sm:p-4 rounded-md flex items-start gap-2 sm:gap-3
