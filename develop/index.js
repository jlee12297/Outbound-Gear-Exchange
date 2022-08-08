

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
    
  });

  function showUploadWidget() {
 cloudinary.openUploadWidget({
    cloudName: "<cloud name>",
    uploadPreset: "<upload preset>",
    sources: [
        "local",
        "url",
        "camera",
        "google_drive"
    ],
    googleApiKey: "<image_search_google_api_key>",
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
        palette: {
            window: "#C7DE39",
            sourceBg: "#ADEAFF",
            windowBorder: "#000000",
            tabIcon: "#cc6600",
            inactiveTabIcon: "#060400",
            menuIcons: "#120701",
            link: "#ffb107",
            action: "#ffcc00",
            inProgress: "#99cccc",
            complete: "#78b3b4",
            error: "#ff6666",
            textDark: "#4C2F1A",
            textLight: "#D8CFCF"
        },
        fonts: {
            default: null,
            "'Poppins', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Poppins",
                active: true
            }
        }
    }
},
 (err, info) => {
   if (!err) {    
     console.log("Upload Widget event - ", info);
   }
  });
 }
