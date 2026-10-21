// Authentication service for Nectara Jewels
'use server'

import { getServiceClient, createClient } from '@/lib/supabase-server'
import { RegisterInput, LoginInput } from '@/lib/validation'

export async function registerUser(input: RegisterInput) {
  const supabase = await getServiceClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
    }
  }

  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: false,
    })

    if (authError) {
      return {
        success: false,
        error: authError.message,
      }
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'Failed to create user',
      }
    }

    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email: input.email,
      full_name: input.fullName,
      role: input.role,
      status: 'pending_verification',
      email_verified: false,
    })

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return {
        success: false,
        error: 'Failed to create user profile',
      }
    }

    return {
      success: true,
      message: 'Registration successful. Please verify your email.',
      userId: authData.user.id,
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred during registration',
    }
  }
}

export async function loginUser(input: LoginInput) {
  const supabase = await createClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
    }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data.user) {
      return {
        success: false,
        error: 'Login failed',
      }
    }

    return {
      success: true,
      message: 'Login successful',
      userId: data.user.id,
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred during login',
    }
  }
}

export async function logoutUser() {
  const supabase = await createClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
    }
  }

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      message: 'Logged out successfully',
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred during logout',
    }
  }
}

export async function getCurrentUser() {
  const supabase = await createClient()

  if (!supabase) {
    return null
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      ...user,
      profile,
    }
  } catch (error) {
    return null
  }
}

export async function resetPassword(email: string) {
  const supabase = await createClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
    }
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      message: 'Password reset link sent to your email',
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient()

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Add your project URL and keys to .env.local.',
    }
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      message: 'Password updated successfully',
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
