import './../styles/VideoPlayer.css';

// Función para convertir una URL de YouTube a formato 'embed'
const getYouTubeEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('/embed/')) {
      return url;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default function VideoPlayer({ url }) {
  const isYouTubeUrl = url.includes('youtube.com') || url.includes('youtu.be');

  if (isYouTubeUrl) {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (!embedUrl) {
      return <p>La URL del vídeo de YouTube no es válida.</p>;
    }
    return (
      <div className="video-player-container">
        <iframe
          className="video-embed"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Para vídeos directos (ej. desde Firebase Storage)
  return (
    <div className="video-player-container" style={{ backgroundColor: 'black' }}>
      <video controls className="video-embed">
        <source src={url} type="video/mp4" />
        Tu navegador no soporta la etiqueta de vídeo.
      </video>
    </div>
  );
}
