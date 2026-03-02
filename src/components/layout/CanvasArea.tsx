import { CanvasWrapper } from '../canvas/CanvasWrapper'

interface Props {
  canvasRef: React.RefObject<HTMLDivElement | null>
}

export function CanvasArea({ canvasRef }: Props) {
  return (
    <main className="h-full overflow-hidden bg-brand-dark-950 p-4">
      <CanvasWrapper canvasRef={canvasRef} />
    </main>
  )
}
