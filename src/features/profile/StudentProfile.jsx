import {
ArrowLeft,
BadgeCheck,
MessageCircle,
UserPlus,
MapPin,
} from 'lucide-react'

import { useApp } from '../../store/AppContext'
import Button from '../../components/ui/Button'

export default function StudentProfile({
student,
onBack,
onMessage,
onConnect,
connectionStatus = 'none',
connecting = false,
}) {
const { state, toast } = useApp()

function handleConnect() {
if (!state.token) {
toast('Please log in to connect with students.')
return
}

```
if (connectionStatus === 'connected') {
  toast('You are already connected with this student.')
  return
}

if (connectionStatus === 'sent') {
  toast('Your connection request has already been sent.')
  return
}

if (connectionStatus === 'received') {
  toast('You have a pending request from this student. Accept it from your connections screen.')
  return
}

if (typeof onConnect !== 'function') {
  toast('Connection functionality is not configured yet.')
  return
}

onConnect()
```

}

function openMessage() {
if (!state.token) {
toast('Please log in to message students.')
return
}

```
if (connectionStatus !== 'connected') {
  toast('Connect with this student first. Messaging is available after the request is accepted.')
  return
}

if (typeof onMessage !== 'function') {
  toast('Chat navigation is not configured yet.')
  return
}

onMessage(student)
```

}

const connectionLabel = {
none: 'Connect',
sent: 'Request Sent',
received: 'Request Received',
connected: 'Connected',
}[connectionStatus] || 'Connect'

return ( <div className="space-y-7"> <header className="flex items-center gap-3"> <button
       type="button"
       onClick={onBack}
       aria-label="Go back"
       className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-campus-gray transition hover:bg-campus-border active:scale-95"
     > <ArrowLeft size={19} /> </button>

```
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-campus-muted">
        CampusX
      </p>
      <h2 className="text-xl font-extrabold text-campus-black">
        Student Profile
      </h2>
    </div>
  </header>

  <section className="rounded-campus border border-campus-border bg-white p-6 shadow-campus">
    <div className="flex flex-col items-center text-center">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-campus-lime text-4xl font-extrabold text-campus-black">
        {student.name?.charAt(0)?.toUpperCase() || '?'}
      </div>

      <h1 className="mt-4 flex items-center gap-1.5 text-2xl font-extrabold text-campus-black">
        {student.name}
        <BadgeCheck
          size={19}
          fill="#FFF3A3"
          className="text-campus-black"
        />
      </h1>

      <p className="mt-1 text-sm text-campus-muted">
        {student.common ||
          [
            student.college,
            student.course,
            student.year ? `Year ${student.year}` : null,
          ]
            .filter(Boolean)
            .join(' · ')}
      </p>

      {student.score != null && (
        <span className="mt-3 rounded-full bg-campus-yellow px-3 py-1 text-xs font-bold text-campus-black">
          {student.score}% match
        </span>
      )}
    </div>

    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-campus-muted">
      <MapPin size={16} />
      <span>Campus community</span>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="gold"
        onClick={handleConnect}
        disabled={
          connecting ||
          connectionStatus === 'sent' ||
          connectionStatus === 'received' ||
          connectionStatus === 'connected'
        }
        className="flex items-center justify-center gap-2"
      >
        <UserPlus size={17} />
        {connecting ? 'Sending...' : connectionLabel}
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={openMessage}
        disabled={connectionStatus !== 'connected'}
        className="flex items-center justify-center gap-2"
      >
        <MessageCircle size={17} />
        Message
      </Button>
    </div>
  </section>

  <section>
    <h3 className="text-sm font-bold text-campus-black">
      About
    </h3>
    <p className="mt-2 text-sm leading-6 text-campus-muted">
      {student.bio ||
        'Student at CampusX. Interested in learning, collaborating and connecting with other students.'}
    </p>
  </section>

  <section className="rounded-campus bg-campus-gray p-5">
    <p className="text-xs font-semibold uppercase tracking-wider text-campus-muted">
      Why you matched
    </p>
    <p className="mt-2 font-bold text-campus-black">
      {student.common || 'Campus community'}
    </p>
    <p className="mt-1 text-sm text-campus-muted">
      You have similar academic interests.
    </p>
  </section>
</div>


)
}
