'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthProvider";

const personalSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
});

const propertySchema = z.object({
  prefecture: z.string().min(1),
  city: z.string().min(1),
  town: z.string().min(1),
  landSize: z.coerce.number().positive(),
});

type PersonalFormData = z.infer<typeof personalSchema>;
type PropertyFormData = z.infer<typeof propertySchema>;

export default function EstimatePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState<"personal" | "property" | "result">("personal");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    prefecture: "", city: "", town: "", landSize: 0,
  });
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const personalForm = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const propertyForm = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      prefecture: "", city: "", town: "", landSize: 0,
    },
  });

  const onPersonalSubmit = (data: PersonalFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep("property");
  };

  const onPropertySubmit = (data: PropertyFormData) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    const price = data.landSize * 84700;
    setEstimatedPrice(price);
    setStep("result");
  };

  const handleSubmit = async () => {
    const { name, phone, email, prefecture, city, town, landSize } = formData;
    const price = estimatedPrice;

    if (isNaN(landSize)) {
      toast.error("土地面積が不正です");
      return;
    }

    const { error } = await supabase.from("customers").insert({
      user_id: user?.id,
      name,
      phone,
      email,
      address: `${prefecture} ${city} ${town}`,
      area: landSize,
      price,
      status: "見積済",
    });

    if (error) {
      toast.error("保存に失敗しました");
    } else {
      toast.success("査定が保存されました！");
      router.push("/dashboard");
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">不動産簡易査定</CardTitle>
            <CardDescription className="text-center">
              {step === "personal"
                ? "お客様情報を入力してください"
                : step === "property"
                ? "物件情報を入力してください"
                : "査定結果をご確認ください"}
            </CardDescription>
          </CardHeader>

          {step === "personal" && (
            <CardContent>
              <Form {...personalForm}>
                <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-4">
                  <FormField control={personalForm.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>お名前</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={personalForm.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>電話番号</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={personalForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-blue-700 text-white">次へ</Button>
                </form>
              </Form>
            </CardContent>
          )}

          {step === "property" && (
            <CardContent>
              <Form {...propertyForm}>
                <form onSubmit={propertyForm.handleSubmit(onPropertySubmit)} className="space-y-4">
                  <FormField control={propertyForm.control} name="prefecture" render={({ field }) => (
                    <FormItem>
                      <FormLabel>都道府県</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="選択してください" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="広島県">広島県</SelectItem>
                          <SelectItem value="東京都">東京都</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={propertyForm.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>市区町村</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={propertyForm.control} name="town" render={({ field }) => (
                    <FormItem>
                      <FormLabel>町名・番地</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={propertyForm.control} name="landSize" render={({ field }) => (
                    <FormItem>
                      <FormLabel>土地面積（㎡）</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep("personal")} className="flex-1">戻る</Button>
                    <Button type="submit" className="flex-1 bg-blue-700 text-white">査定する</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          )}

          {step === "result" && (
            <>
              <CardContent>
                <div className="text-center text-sm text-gray-600 mb-2">査定金額</div>
                <div className="text-2xl font-bold text-center text-blue-900 mb-4">
                  {estimatedPrice.toLocaleString()} 円
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setStep("property")}>修正する</Button>
                <Button onClick={handleSubmit} className="bg-blue-700 text-white">保存して完了</Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
