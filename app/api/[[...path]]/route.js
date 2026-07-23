import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const path = params?.path?.join('/') || ''
  if (path === 'health' || path === '') {
    return NextResponse.json({ status: 'ok', service: 'Khalifa Medical & General Store' })
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function POST(request, { params }) {
  const path = params?.path?.join('/') || ''
  if (path === 'inquiry') {
    try {
      const body = await request.json()
      // Log inquiry (in real prod, could persist to Mongo). For MVP we simply echo back.
      console.log('New inquiry received:', body)
      return NextResponse.json({ success: true, message: 'Inquiry received' })
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 400 })
    }
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
