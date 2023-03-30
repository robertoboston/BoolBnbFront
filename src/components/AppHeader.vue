<script>
export default {

}
</script>
<template lang="">
    <header>
	<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
		<div class="container">
			<a class="navbar-brand d-flex align-items-center py-0" href="http://localhost:5173/">
				<div id="logo-container" class="d-flex align-items-center">
					<img src="../assets/images/bnb-logo.png" alt="bnb-logo" style="width: 60px" class="me-2">
					<h2>bool</h2>
					<h2 class="color-blue">b</h2>
					<h2 class="color-yellow">n</h2>
					<h2 class="color-red">b</h2>
				</div>
			</a>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
				<span class="navbar-toggler-icon"></span>
		  </button>


		  <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
				<!-- Left Side Of Navbar -->
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<a class="nav-link" href="#"></a>
					</li>
				</ul>

				<!-- Right Side Of Navbar -->
				<ul class="navbar-nav ml-auto">
					<!-- Authentication Links -->

                    <a href="http://127.0.0.1:8000/login" class="text-black fw-bolder">Login</a>
					
					<!-- <li class="nav-item dropdown">
						<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
								
						</a>

						<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="{{ url('admin') }}"><i class="fa-solid fa-house color-blue"></i> </a>
							<a class="dropdown-item" href="{{ url('profile') }}"><i class="fa-solid fa-circle-user color-yellow"></i> </a>
							<a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
														document.getElementById('logout-form').submit();">
								<i class="fa-solid fa-right-from-bracket color-red"></i> 
							</a>

							<form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
								@csrf
							</form>
						</div>
					</li> -->
				</ul>
			  </div>
		</div>
	</nav>
</header>
</template>
<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    width: 100%;

    nav {
        #logo-container {
            h2 {
                font-weight: 700;
                margin-bottom: 0;
            }
        }

        a {
            text-decoration: none;
        }

        .color-blue {
            color: #3FA9F5;
            ;
        }

        .color-yellow {
            color: #FC9D15;
        }

        .color-red {
            color: #E33F3D;
        }
    }
}
</style>