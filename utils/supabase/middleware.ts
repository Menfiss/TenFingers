import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const data = await supabase.from('users').select('role').eq('id', user.id)
    if(request.nextUrl.pathname.startsWith('/admin') && data.data && data.data[0].role !== 'admin'){
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }
  
  
  if (
    !user &&(
    request.nextUrl.pathname.startsWith('/sections') ||
    request.nextUrl.pathname.startsWith('/profile')||
    request.nextUrl.pathname.startsWith('/exercise/*')||
    request.nextUrl.pathname.startsWith('/admin')
    )
  ) {
    // redirect user for login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export { updateSession }