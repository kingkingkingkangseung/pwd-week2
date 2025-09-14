// src/routes/api/projects/+server.js
import { json } from '@sveltejs/kit';

const projects = [
  { slug:'timetable', title:'Timetable Helper', summary:'수업/일정 정리 도우미' },
  { slug:'gallery',   title:'Image Gallery',    summary:'미니 이미지 갤러리' },
  { slug:'memo',      title:'Memo Pad',         summary:'로컬에 메모 저장' }
];

export function GET() {
  return json(projects);
}