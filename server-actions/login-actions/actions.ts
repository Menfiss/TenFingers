'use server'


import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from "../../utils/supabase/server"

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return error.message;
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {

  let pass = formData.get('password') as string;
  let confirmPass = formData.get('confirm-password') as string;

  if (pass !== confirmPass) {
    return "Passwords do not match";
  }
  if (pass.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if(!(/[A-Z]/.test(pass))){
    return "Password must contain at least one uppercase letter";
  }
  if(!(/[a-z]/.test(pass))){
    return "Password must contain at least one lowercase letter";
  }
  if(!(/[0-9]/.test(pass))){
    return "Password must contain at least one number";
  }
  

  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        nickname: formData.get('name') as string,
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    revalidatePath('/', 'layout')
    return error.message;
  }

 
  revalidatePath('/', 'layout')
  redirect('/')
}



export async function signout(){
  const supabase = createClient()
  const { error } = await supabase.auth.signOut();
}
