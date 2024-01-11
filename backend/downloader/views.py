# downloader/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import yt_dlp

@csrf_exempt
def download_view(request):
    if request.method == 'POST':
        video_url = request.POST.get('video_url')
        print(f"Received video_url: {video_url}")

        try:
            if video_url:
                ydl_opts = {
                    'outtmpl': 'downloads/%(title)s.%(ext)s',
                }
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info_dict = ydl.extract_info(video_url, download=True)
                    file_name = ydl.prepare_filename(info_dict)

                file_url = f"/media/{file_name}"

                response_data = {
                    'success': True,
                    'message': 'Video downloaded successfully',
                    'file_name': file_name,
                    'file_url': file_url,
                }

                return JsonResponse(response_data)
            else:
                raise ValueError("Video URL is not provided")

        except Exception as e:
            print(f"An error occurred: {str(e)}")

            response_data = {
                'success': False,
                'message': f"An error occurred: {str(e)}",
            }
            return JsonResponse(response_data, status=500)

    else:
        response_data = {
            'success': False,
            'message': 'Invalid request method',
        }
        return JsonResponse(response_data, status=400)
