export class CreateCompletedTaskDto {
  instructor_feedback: string;
  message: string;
  userId: number;
  course_contents_id: number;
  task_images?: {
    image_url: string;
    description: string;
  }[];
}
