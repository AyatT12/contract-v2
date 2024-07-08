var current_fs, next_fs, previous_fs;
$(".next").click(function() {
  current_fs = $(this).closest("fieldset");
  next_fs = $(this).closest("fieldset").next();

  if ($("#progressbar li").eq($("fieldset").index(next_fs))[0].id == 'add-driver') {
    var checkbox = document.getElementById('addational-driver');
    
    if (checkbox.checked) {
      next_fs = $(this).closest("fieldset").next();
    } else {
      next_fs = $(this).closest("fieldset").next().next();
    }
  }

  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  // Show the next fieldset
  next_fs.show();
  // Hide the current fieldset with style
  current_fs.hide();
});

$(".previous").click(function() {
	current_fs = $(this).closest("fieldset");
	previous_fs = $(this).closest("fieldset").prev();
  
	if ($("#progressbar li").eq($("fieldset").index(current_fs))[0].id == 'options') {
	  var checkbox = document.getElementById('addational-driver');
  
	  if (checkbox.checked) {
		previous_fs = $(this).closest("fieldset").prev();
	  } else {
		previous_fs = $(this).closest("fieldset").prev().prev();
	  }
	}
  
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  
	// Show the previous fieldset
	previous_fs.show();
	// Hide the current fieldset with style
	current_fs.hide();
  });



///////////////////////////////////////////////the-Modal-6-digit-vaildation/////////////////////


document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#otc').addEventListener('submit', function (event) {
		event.preventDefault();
		var inputFieldValue = document.getElementById('otc-1');
		var numericValue = parseInt(inputFieldValue.value);

		if (isNaN(numericValue)) {
			// Input value is not a number or is empty
			console.log('Input value:', numericValue);
			return;
		}
		$.ajax({
			type: 'POST',
			url: 'https://jsonplaceholder.typicode.com/posts', // Using JSONPlaceholder as a mock server
			data: $(this).serialize(),
			success: function (response) {
				// Handle the response from the mock server
				console.log('Form data submitted successfully:', response);

			},
			error: function (error) {
				// Handle any errors
				console.error('Error submitting form data:', error);
			}
		});
		
	});

});

let in1 = document.getElementById('otc-1'),
	ins = document.querySelectorAll('input[type="number"]'),
	splitNumber = function (e) {
		let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
		if (!data) return; // Shouldn't happen, just in case.
		if (data.length === 1) return; // Here is a normal behavior, not a paste action.

		popuNext(e.target, data);
	},
	popuNext = function (el, data) {
		el.value = data[0]; // Apply first item to first input
		data = data.substring(1); // remove the first char.
		if (el.nextElementSibling && data.length) {
			// Do the same with the next element and next data
			popuNext(el.nextElementSibling, data);
		}
	};

ins.forEach(function (input) {
	/**
	 * Control on keyup to catch what the user intent to do.
	 ... */
	input.addEventListener('keyup', function (e) {
		// Break if Shift, Tab, CMD, Option, Control.
		if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
			return;
		}

		// On Backspace or left arrow, go to the previous field.
		if ((e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT") {
			this.previousElementSibling.select();
		} else if (e.keyCode !== 8 && this.nextElementSibling) {
			this.nextElementSibling.select();
		}

		// If the target is populated too quickly, value length can be > 1
		if (e.target.value.length > 1) {
			splitNumber(e);
		}
	});

	input.addEventListener('focus', function (e) {
		if (this === in1) return;

		if (in1.value == '') {
			in1.focus();
		}
		if (this.previousElementSibling.value == '') {
			this.previousElementSibling.focus();
		}
	});
	const B = document.querySelector('.check-btn.check');

});
in1.addEventListener('input', splitNumber);


// // //////////////////////choose-adriver-display////////////////
document.addEventListener("DOMContentLoaded", function () {
	var driverRadio1 = document.getElementById("driver1");
	var driverRadio2 = document.getElementById("driver2");
	var PrivateDriverSelect = document.getElementById("Private-Driver-select");

	driverRadio1.addEventListener("click", function () {
		PrivateDriverSelect.style.display = "none";
	});

	driverRadio2.addEventListener("click", function () {
		if (this.checked) {
			PrivateDriverSelect.style.display = "block";
		} else {
			PrivateDriverSelect.style.display = "none";
		}
	});
});

// // /////////////////////////////////////////
let isScrolling = false;
let startX, startY, scrollLeft, scrollTop;

const scrollContainer = document.getElementById('scrollContainer');

scrollContainer.addEventListener('mousedown', (e) => {
	isScrolling = true;
	startX = e.pageX - scrollContainer.offsetLeft;
	startY = e.pageY - scrollContainer.offsetTop;
	scrollLeft = scrollContainer.scrollLeft;
	scrollTop = scrollContainer.scrollTop;
});

scrollContainer.addEventListener('mouseleave', () => {
	isScrolling = false;
});

scrollContainer.addEventListener('mouseup', () => {
	isScrolling = false;
});

scrollContainer.addEventListener('mousemove', (e) => {
	if (!isScrolling) return;
	e.preventDefault();
	const x = e.pageX - scrollContainer.offsetLeft;
	const y = e.pageY - scrollContainer.offsetTop;
	const walkX = (x - startX) * 2;
	const walkY = (y - startY) * 2;
	scrollContainer.scrollLeft = scrollLeft - walkX;
	scrollContainer.scrollTop = scrollTop - walkY;
});
// // ////////////////////////////////////////////////////////////////////////////////
function openThirdPopuppp() {
	// Hide the second popup modal
	$('#paymentPopupModal').modal('hide');

	// Open the third popup modal
	$('#thirdPopupModal').modal('show');

	// Close the third popup modal after 5 seconds
	setTimeout(function () {
		$('#thirdPopupModal').modal('hide');
		$('#checkModalToggle').modal('show'); // Show the checkModalToggle modal
	}, 5000); // Adjust the duration as needed (in milliseconds)
}


// // //////////////////////////////////////////////// رفع صورة التوقيع ////////////////////////////////////////////////////////////////////////
const uploadContainer = document.querySelector('.upload-container');
const mainContainer = document.querySelector('.main-container');

const imageUpload = document.getElementById('imageUpload');
const imageSubmitBtn = document.getElementById('image-submit-Btn');
var imgeURL 
const uploadedImg = null
uploadContainer.addEventListener('click', function () {
	imageUpload.click();
});

imageUpload.addEventListener('change', function () {
	const file = imageUpload.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const imageURL = e.target.result;
			const previewImage = document.createElement('img');
			previewImage.classList.add('preview-image');
			previewImage.src = imageURL;
			imgeURL= imageURL
			mainContainer.innerHTML = '<i class="fa-regular fa-circle-xmark"  style="cursor: pointer;"></i>';
			uploadContainer.innerHTML = '';
			uploadContainer.appendChild(previewImage);
			uploadContainer.classList.add('previewing');
		};
		reader.readAsDataURL(file);
	}
});

imageSubmitBtn.addEventListener('click', function (event) {
	event.preventDefault(); 
	if (uploadContainer.firstChild) {
		uploadContainer.innerHTML = ''; 
		uploadContainer.classList.remove('previewing'); 
		uploadContainer.innerHTML = ' <img class="upload-icon" src="img/Rectangle 144.png" alt="Upload Icon"><p>ارفق صورة التوقيع</p>';
      console.log(imgeURL)
	} 
	$('#PicsignatureModal').modal('hide');

	
});
removeSignatureImg.addEventListener('click', function (event) {
	event.preventDefault(); 
	if (uploadContainer.firstChild) {
		uploadContainer.innerHTML = ''; 
		mainContainer.innerHTML = '';
		uploadContainer.classList.remove('previewing'); 
		uploadContainer.innerHTML = ' <img class="upload-icon" src="img/Rectangle 144.png" alt="Upload Icon"><p>ارفق صورة التوقيع</p>';
	}  
});
// ///////%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

