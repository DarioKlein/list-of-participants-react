import { Search, MoreHorizontal, ChevronsLeft, ChevronRight, ChevronsRight, ChevronLeft } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

dayjs.extend(relativeTime).locale('pt-br')

interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

// Generate mock attendees
function generateMockAttendees(count: number): Attendee[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1).padStart(6, '0'),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    createdAt: dayjs().subtract(faker.number.int({ min: 1, max: 30 }), 'day').toISOString(),
    checkedInAt: faker.datatype.boolean(0.7) ? dayjs().subtract(faker.number.int({ min: 0, max: 10 }), 'hour').toISOString() : null,
  }))
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    }
    return ''
  })

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }
    return 1
  })
  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [allAttendees] = useState<Attendee[]>(() => generateMockAttendees(250))
  const totalPages = Math.ceil(total / 10)

  useEffect(() => {
    // Filter attendees based on search
    let filtered = allAttendees
    
    if (search.length > 0) {
      filtered = allAttendees.filter(
        attendee => 
          attendee.name.toLowerCase().includes(search.toLowerCase()) ||
          attendee.email.toLowerCase().includes(search.toLowerCase()) ||
          attendee.id.includes(search)
      )
    }

    const total = filtered.length
    const pageIndex = page - 1
    const start = pageIndex * 10
    const end = start + 10
    
    setTotal(total)
    setAttendees(filtered.slice(start, end))
  }, [page, search, allAttendees])

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)
    window.history.pushState({}, '', url)
    setSearch(search)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    window.history.pushState({}, '', url)
    setPage(page)
  }

  function onSearchInputChanged(e: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value)
    setCurrentPage(1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0"
            type="text"
            placeholder="Buscar participante..."
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.length > 0 ? (
            attendees.map(({ id, name, email, createdAt, checkedInAt }) => {
              return (
                <TableRow id="container-elements-rows" key={id} className="border-b border-white/10 hover:bg-white/10">
                  <TableCell>
                    <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10" />
                  </TableCell>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{name}</span>
                      <span>{email.toLocaleLowerCase()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(createdAt)}</TableCell>
                  <TableCell>
                    {checkedInAt === null ? (
                      <span className="text-zinc-400">Não fez check-in</span>
                    ) : (
                      dayjs().to(checkedInAt)
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell className="text-center h-20 text-lg font-extrabold" colSpan={6}>
                {search ? 'Usuário(s) não encontrado(s)' : 'Página não encontrada!'}
              </TableCell>
            </TableRow>
          )}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {attendees.length > 0 ? total : '0'} itens
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page > totalPages ? 0 : page} de {attendees.length > 0 ? totalPages : '0'}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1 || attendees.length === 0}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1 || attendees.length === 0}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages || attendees.length === 0}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages || attendees.length === 0}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  )
}
